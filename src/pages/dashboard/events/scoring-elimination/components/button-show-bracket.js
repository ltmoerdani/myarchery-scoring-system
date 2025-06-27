import React from "react";
import { Bracket } from "@sportsgram/brackets";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, Button } from "reactstrap";
import { ButtonBlue, LoadingScreen, AlertSubmitError } from "components/ma";
import { stringUtil } from "utils";

const StyledBracketSeed = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  
  &.round-third-place {
    margin-left: 3.75rem;
  }
`;

const StyledBracketSeedItem = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
  background-color: var(--ma-primary-blue-50);
`;

const StyledBracketSeedTeam = styled.div`
  gap: 0.25rem;
  padding: 0.5rem;
  border: solid 2px #757575;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: var(--bs-body-color);
  font-size: var(--bs-body-font-size);

  &.item-active {
    border-color: #0d47a1;
  }

  &.item-winner {
    border-color: var(--ma-blue);
    background-color: #bc8b2c;
    color: #000000;
  }
`;

function ButtonShowBracket({ categoryDetailId, eventId }) {
  const history = useHistory();

  const handleClickBracket = () => {
    const url = stringUtil.createUrlParamFromObj({
      categoryId: categoryDetailId,
    });
    history.push(`/dashboard/events/${eventId}/elimination/bracket${url}`);
  };

  return (
    <Button color="info" size="sm" onClick={handleClickBracket}>
      Lihat Bagan
    </Button>
  );
}

export default ButtonShowBracket;
