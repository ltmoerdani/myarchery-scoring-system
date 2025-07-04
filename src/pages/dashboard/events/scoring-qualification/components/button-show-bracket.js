import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEliminationBracketTemplate } from "../hooks/elimination-template";

import { Modal, ModalBody } from "reactstrap";
import { Bracket, SeedItem } from "@sportsgram/brackets";
import {
  ButtonOutlineBlue,
  LoadingScreen,
  AlertSubmitError,
} from "components/ma";
import { ErrorBoundary } from "components/ma/error-boundary";

import IconBranch from "components/ma/icons/mono/branch";
import IconX from "components/ma/icons/mono/x";

import classnames from "classnames";

function ButtonShowBracket({
  categoryDetailId,
  eliminationMemberCount,
  eventDetail,
}) {
  ButtonShowBracket.propTypes = {
    categoryDetailId: PropTypes.string.isRequired,
    eliminationMemberCount: PropTypes.number.isRequired,
    eventDetail: PropTypes.object.isRequired,
  };
  const [isOpen, setOpen] = React.useState(false);
  const {
    data: bracketData,
    fetchEliminationTemplate,
    isLoading,
    isError,
    errors,
  } = useEliminationBracketTemplate(categoryDetailId, eliminationMemberCount);

  const eliminationNumber = _getEliminationNumber(bracketData);

  React.useEffect(() => {
    if (bracketData) {
      let arrData = [];
      let rowTwo = 0;
      let titleLabel = "";
      bracketData.rounds.map((val) => {
        switch (val.seeds.length) {
          case 8:
            titleLabel = "1/8";
            break;
          case 4:
            titleLabel = "1/4";
            break;
          case 2:
            titleLabel = "Semi-Final";
            break;
          case 1:
            if (rowTwo < 1) {
              rowTwo = 1;
              titleLabel = "Final";
            } else {
              titleLabel = "3rd Place";
            }
            break;

          default:
            titleLabel = "1/16";
            break;
        }
        let obj = {
          round: val.round,
          seeds: val.seeds,
          title: (
            <span className="badge bg-primary rounded-pill fs-6">
              {titleLabel}
            </span>
          ),
        };

        return arrData.push(obj);
      });
      bracketData.rounds = arrData;
    }
  }, [bracketData]);

  return (
    <React.Fragment>
      <LoadingScreen loading={isLoading} />
      <AlertSubmitError isError={isError} errors={errors} />

      <ButtonOutlineBlue
        flexible
        title="Lihat Bagan"
        onClick={() => {
          fetchEliminationTemplate({
            onSuccess() {
              setOpen(true);
            },
          });
        }}
      >
        <IconBranch size="20" />
      </ButtonOutlineBlue>

      <ErrorBoundary>
        {isOpen && (
          <Modal
            isOpen
            size="xl"
            centered
            backdrop="static"
            autoFocus
            toggle={() => setOpen((open) => !open)}
            onClosed={() => setOpen(false)}
          >
            <ModalBody>
              <BodyWrapper>
                <TopBar>
                  <div>
                    {Boolean(eliminationNumber) && (
                      <Heading>{eliminationNumber} Besar</Heading>
                    )}
                  </div>

                  <div>
                    <EditorCloseButton flexible onClick={() => setOpen(false)}>
                      <IconX size="16" />
                    </EditorCloseButton>
                  </div>
                </TopBar>

                <div>
                  <Scrollable>
                    {bracketData.eliminationId ||
                    bracketData.eliminationGroupId ? (
                      <Bracket
                        rounds={bracketData.rounds || []}
                        renderSeedComponent={(bracketProps) => (
                          <SeedBagan
                            eventDetail={eventDetail}
                            bracketProps={bracketProps}
                            configs={{
                              totalRounds: bracketData.rounds.length - 1,
                              eliminationId:
                                bracketData.eliminationId ||
                                bracketData.eliminationGroupId,
                              isTeam:
                                typeof bracketData.eliminationGroupId !==
                                "undefined",
                            }}
                          />
                        )}
                      />
                    ) : bracketData.rounds?.length ? (
                      <Bracket
                        rounds={bracketData.rounds || []}
                        renderSeedComponent={(bracketProps) => (
                          <SeedPreview
                            eventDetail={eventDetail}
                            bracketProps={bracketProps}
                            configs={{
                              totalRounds: bracketData.rounds.length - 1,
                              eliminationId:
                                bracketData.eliminationId ||
                                bracketData.eliminationGroupId,
                              isTeam:
                                typeof bracketData.eliminationGroupId !==
                                "undefined",
                            }}
                          />
                        )}
                      />
                    ) : (
                      <NoBracketAvailable />
                    )}
                  </Scrollable>
                </div>
              </BodyWrapper>
            </ModalBody>
          </Modal>
        )}
      </ErrorBoundary>
    </React.Fragment>
  );
}

function NoBracketAvailable() {
  return (
    <NoBracketWrapper>
      <h4>Bagan belum tersedia</h4>
    </NoBracketWrapper>
  );
}

function SeedPreview({ bracketProps, configs, eventDetail }) {
  SeedPreview.propTypes = {
    bracketProps: PropTypes.shape({
      roundIndex: PropTypes.number.isRequired,
      seed: PropTypes.shape({
        teams: PropTypes.array.isRequired,
      }).isRequired,
      breakpoint: PropTypes.number,
    }).isRequired,
    configs: PropTypes.shape({
      totalRounds: PropTypes.number.isRequired,
      isTeam: PropTypes.bool.isRequired,
    }).isRequired,
    eventDetail: PropTypes.object.isRequired,
  };

  const { roundIndex, seed } = bracketProps;
  const { totalRounds, isTeam } = configs;
  const { isFinalRound, isThirdPlaceRound } = _getRoundPositions({
    totalRounds,
    roundIndex,
  });

  React.useEffect(() => {}, [eventDetail]);

  return (
    <StyledSeed>
      <StyledSeedItem>
        <StyledSeedTeam>
          {isFinalRound && <FinalHeading>Babak Final</FinalHeading>}
          {isThirdPlaceRound && <FinalHeading>Perebutan Juara 3</FinalHeading>}

          {seed.teams?.map((team, index) => {
            let contingent =
              team.parentClassificationType === 1
                ? team.clubName
                : team.parentClassificationType === 2
                ? team.countryName
                : team.parentClassificationType === 3
                ? team.provinceName
                : team.parentClassificationType === 4
                ? team.cityName
                : team.childrenClassificationMembersName;
            const budrestNumber = team.budRestNumber + team.targetFace;
            return (
              <SeedWrapper key={index}>
                <SeedBudrest
                  className={classnames({
                    "budrest-odd": index === 0,
                    "budrest-even": index === 1,
                  })}
                  title={budrestNumber}
                >
                  {budrestNumber}
                  {/* {budrestNumber || <React.Fragment>&ndash;</React.Fragment>} */}
                </SeedBudrest>

                <StyledSeedTeam
                  key={index}
                  title={team.name || team.team}
                  className={classnames({
                    "item-even": index === 1,
                  })}
                >
                  <BoxNameGroup>
                    <BoxName title={team.name || team.team}>
                      {team.name || team.team || (
                        <React.Fragment>&ndash;</React.Fragment>
                      )}
                    </BoxName>

                    {!isTeam ? (
                      <>
                        {/* {!eventDetail.withContingent ? (
                          <BoxName title={team.clubName} className="name-club">
                            {team.clubName || (
                              <React.Fragment>&nbsp;</React.Fragment>
                            )}
                          </BoxName>
                        ) : (
                          <BoxName title={team.cityName} className="name-club">
                            {team.cityName || (
                              <React.Fragment>&nbsp;</React.Fragment>
                            )}
                          </BoxName>
                        )} */}
                        <BoxName
                          title={!contingent ? <>&nbsp;</> : contingent}
                          className="name-club"
                        >
                          {!contingent ? <>&nbsp;</> : contingent}
                        </BoxName>
                      </>
                    ) : (
                      <MemberList>
                        {team.teams?.map((member, index) => (
                          <li key={index}>
                            <span className="member-name" title={member.name}>
                              <span className="member-number">
                                {index + 1}.
                              </span>
                              <span>{member.name}</span>
                            </span>
                          </li>
                        ))}
                      </MemberList>
                    )}
                  </BoxNameGroup>
                </StyledSeedTeam>

                <SeedRank>
                  {team.potition || team.postition ? (
                    <React.Fragment>
                      #{team.potition || team.postition}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>&nbsp;</React.Fragment>
                  )}
                </SeedRank>
              </SeedWrapper>
            );
          })}
        </StyledSeedTeam>
      </StyledSeedItem>
    </StyledSeed>
  );
}

function SeedBagan({ bracketProps, configs, eventDetail }) {
  SeedBagan.propTypes = {
    bracketProps: PropTypes.shape({
      roundIndex: PropTypes.number.isRequired,
      seed: PropTypes.shape({
        teams: PropTypes.array.isRequired,
      }).isRequired,
      breakpoint: PropTypes.number,
    }).isRequired,
    configs: PropTypes.shape({
      totalRounds: PropTypes.number.isRequired,
      isTeam: PropTypes.bool.isRequired,
    }).isRequired,
    eventDetail: PropTypes.object.isRequired,
  };

  const { roundIndex, seed } = bracketProps;
  const { totalRounds, isTeam } = configs;
  const { isFinalRound, isThirdPlaceRound } = _getRoundPositions({
    totalRounds,
    roundIndex,
  });

  React.useEffect(() => {}, [eventDetail]);

  return (
    <StyledSeed>
      <StyledSeedItem>
        <StyledSeedTeam>
          {isFinalRound && <FinalHeading>Babak Final</FinalHeading>}
          {isThirdPlaceRound && <FinalHeading>Perebutan Juara 3</FinalHeading>}

          {seed.teams?.map((team, index) => {
            let contingent =
              team.parentClassificationType === 1
                ? team.clubName
                : team.parentClassificationType === 2
                ? team.countryName
                : team.parentClassificationType === 3
                ? team.provinceName
                : team.parentClassificationType === 4
                ? team.cityName
                : team.childrenClassificationMembersName;

            return (
              <SeedWrapper key={index}>
                <SeedBudrest
                  className={classnames({
                    "budrest-odd": index === 0,
                    "budrest-even": index === 1,
                  })}
                  title={team.budrestNumber}
                >
                  {team.budrestNumber || (
                    <React.Fragment>&ndash;</React.Fragment>
                  )}
                </SeedBudrest>

                <StyledSeedTeam
                  title={team.name || team.teamName}
                  className={classnames({
                    "item-even": index === 1,
                  })}
                >
                  <BoxNameGroup>
                    <BoxName title={team.name || team.teamName}>
                      {team.name || team.teamName || (
                        <React.Fragment>&ndash;</React.Fragment>
                      )}
                    </BoxName>

                    {!isTeam ? (
                      <>
                        {/* {!eventDetail.withContingent ? (
                          <BoxName title={team.club} className="name-club">
                            {team.club || (
                              <React.Fragment>&nbsp;</React.Fragment>
                            )}
                          </BoxName>
                        ) : (
                          <BoxName title={team.city} className="name-club">
                            {team.city || (
                              <React.Fragment>&nbsp;</React.Fragment>
                            )}
                          </BoxName>
                        )} */}
                        <BoxName
                          title={!contingent ? <>&nbsp;</> : contingent}
                          className="name-club"
                        >
                          {!contingent ? <>&nbsp;</> : contingent}
                        </BoxName>
                      </>
                    ) : (
                      <MemberList>
                        {team.memberTeam?.map((member, index) => (
                          <li key={index}>
                            <span className="member-name" title={member.name}>
                              <span className="member-number">
                                {index + 1}.
                              </span>
                              <span>{member.name}</span>
                            </span>
                          </li>
                        ))}
                      </MemberList>
                    )}
                  </BoxNameGroup>
                </StyledSeedTeam>

                <SeedRank>
                  {team.potition ? (
                    <React.Fragment>#{team.potition}</React.Fragment>
                  ) : (
                    <React.Fragment>&nbsp;</React.Fragment>
                  )}
                </SeedRank>
              </SeedWrapper>
            );
          })}
        </StyledSeedTeam>
      </StyledSeedItem>
    </StyledSeed>
  );
}

/* ================================== */
// styles

const BodyWrapper = styled.div`
  > * + * {
    margin-top: 1rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  > *:nth-child(1) {
    flex-grow: 1;
  }

  > *:nth-child(2) {
    flex-shrink: 0;
  }
`;

const Heading = styled.h5`
  margin-top: 0.5rem;
  margin-bottom: 0;
  color: var(--ma-blue);
  font-weight: 600;
`;

const Scrollable = styled.div`
  overflow-x: auto;
`;

const NoBracketWrapper = styled.div`
  min-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > *:nth-child(1) {
    margin-top: -2rem;
    color: var(--ma-gray-400);
  }
`;

const EditorCloseButton = styled.button`
  padding: 0.375rem 0.625rem;
  border: none;
  background-color: transparent;
  color: var(--ma-blue);

  transition: all 0.15s;

  &:hover {
    box-shadow: 0 0 0 1px var(--ma-gray-200);
  }
`;

const FinalHeading = styled.h6`
  position: absolute;
  top: -3.6em;
  left: 0;
  right: 0;
  font-weight: 600;
  text-align: center;
`;

const StyledSeed = styled(Bracket)`
  padding-top: 2rem;
  padding-bottom: 2rem;

  &.round-third-place {
    margin-left: 3.75rem;
  }
`;

const StyledSeedItem = styled(SeedItem)`
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: none;
`;

const SeedWrapper = styled.div`
  display: flex;

  > *:nth-child(2) {
    flex-grow: 1;
    min-width: 10rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  }
`;

const SeedBudrest = styled.div`
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5rem;
  padding: 0.5rem;
  background-color: var(--ma-primary-blue-50);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--ma-txt-black);
  font-size: 0.625rem;

  &.budrest-odd {
    border-top-left-radius: 0.5rem;
  }

  &.budrest-even {
    border-bottom-left-radius: 0.5rem;
  }
`;

const SeedRank = styled.div`
  flex-shrink: 0;

  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--ma-gray-600);
  font-size: 0.625rem;
  vertical-align: middle;
`;

const StyledSeedTeam = styled(SeedItem)`
  gap: 0.25rem;
  padding: 0.5rem;
  border: solid 2px #757575;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: var(--bs-body-color);
  font-size: var(--bs-body-font-size);

  &.item-even {
    border-top: none;
  }

  &.item-active {
    border-color: #0d47a1;
  }

  &.item-winner {
    border-color: var(--ma-blue);
    background-color: #bc8b2c;
    color: #000000;
  }
`;



const BoxNameGroup = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const BoxName = styled.span`
  max-width: 10rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  &.name-club {
    color: var(--ma-gray-500);
    font-size: 0.7em;
  }
`;

const MemberList = styled.ol`
  margin: 0.5rem 0 0 0;
  padding-left: 0;
  list-style: none;
  text-align: left;
  font-size: 0.7em;

  .member-name {
    margin-top: -0.25rem;
    display: inline-block;
    max-width: 7.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--ma-gray-500);

    .member-number {
      display: inline-block;
      width: 7.5px;
      margin-right: 0.25rem;
    }
  }
`;

/* ========================= */
// utils

function _getEliminationNumber(bracketData) {
  if (!bracketData) {
    return 0;
  }

  const numbersByLength = {
    6: 32, // besar
    5: 16, // besar
    4: 8, // besar
    3: 4, // besar
  };
  return numbersByLength[bracketData.rounds.length];
}

function _getRoundPositions({ totalRounds, roundIndex }) {
  const positionByRounds = {
    5: { finalIndex: 4, thirdPlaceIndex: 5 }, // 32 besar
    4: { finalIndex: 3, thirdPlaceIndex: 4 }, // 16 besar
    3: { finalIndex: 2, thirdPlaceIndex: 3 }, // 8 besar
    2: { finalIndex: 1, thirdPlaceIndex: 2 }, // 4 besar
  };

  const { finalIndex, thirdPlaceIndex } = positionByRounds[totalRounds] || {};
  const isFinalRound = roundIndex === finalIndex;
  const isThirdPlaceRound = roundIndex === thirdPlaceIndex;

  return { isFinalRound, isThirdPlaceRound };
}

export default ButtonShowBracket;
