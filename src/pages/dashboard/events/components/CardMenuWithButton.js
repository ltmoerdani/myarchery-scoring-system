import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Download from "components/icons/Download";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import fileText from "../../../../assets/images/icons/event-menu-file-text.svg";

function CardMenuWithButton({ eventDetail, menu, href, badge, disabled = false, team = false, spanLabel }) {
  // Provide fallback for menu and icon
  const safeMenu = menu || {};
  const icon = safeMenu.icon || fileText;
  const title = safeMenu.title || "";
  const description = safeMenu.description || "";

  if (disabled) {
    return (
      <DisabledCardMenuContainer>
        <div className="menu-body">
          <div className="d-flex justify-content-between">
            <div className="menu-icon mb-3">
              <img className="menu-icon-img" src={icon} alt="menu icon" />
            </div>
            <div>
              <Button
                disabled={disabled}
                className="btn"
                style={{ backgroundColor: "#fff", border: "1px solid #0D47A1" }}
              >
                <Download /> <span style={{ color: "#0D47A1" }}>Unduh Laporan</span>
              </Button>
            </div>
          </div>

          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className="menu-footer">
          <div className="float-end">
            <span className="menu-link" to="#">
              <i className="bx bx-right-arrow-alt fs-3" style={{ color: "var(--ma-gray-500)" }} />
            </span>
          </div>
        </div>

        <div className="disabling-layer" />
      </DisabledCardMenuContainer>
    );
  }

  return (
    <CardMenuContainer>
      <div className="menu-body">
        <div className="d-flex justify-content-between">
          <div className="menu-icon mb-3">
            <img className="menu-icon-img" src={icon} alt="menu icon" />
          </div>
        </div>

        <h3>{title}</h3>
        <p>{description}</p>
        {spanLabel && (
          <div>
            <span className="py-1 px-2" style={{ backgroundColor: "#AEDDC2", borderRadius: "25px" }}>
              {spanLabel}
            </span>
          </div>
        )}
      </div>

      <div className="position-relative">
        <div className="menu-footer">
          {badge && <div className="float-start">{badge}</div>}
          <div className="float-end" style={{ position: "absolute", top: "-4px", left: "88%" }}>
            <Link className="menu-link" to={href || "#"}>
              <i className="bx bx-right-arrow-alt fs-3" style={{ color: "var(--ma-blue)" }} />
            </Link>
          </div>
        </div>
      </div>
    </CardMenuContainer>
  );
}

CardMenuWithButton.propTypes = {
  eventDetail: PropTypes.object,
  menu: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  href: PropTypes.string,
  badge: PropTypes.node,
  disabled: PropTypes.bool,
  team: PropTypes.bool,
  spanLabel: PropTypes.string,
};

const DisabledCardMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 8px;
  background-color: #efefef;

  .menu-body {
    flex-grow: 1;
    padding: 1.25rem;
    padding-bottom: 0;
    user-select: none;

    .menu-icon {
      --icon-radius: 50px;
      width: var(--icon-radius);
      height: var(--icon-radius);

      .menu-icon-img {
        width: 100%;
        height: 100%;
        user-select: none;
      }
    }
  }

  .menu-footer {
    flex-shrink: 0;
    padding: 1.25rem;
    padding-top: 0.5rem;
  }

  .disabling-layer {
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(239, 239, 239, 0.8);
    cursor: default;
    pointer-events: none;
    user-select: none;
  }
`;

const CardMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0.25rem 0.5rem rgb(18 38 63 / 5%);

  transition: all 0.4s;

  .menu-body {
    flex-grow: 1;
    z-index: 10;
    padding: 1.25rem;
    padding-bottom: 0;

    .menu-icon {
      --icon-radius: 50px;
      width: var(--icon-radius);
      height: var(--icon-radius);

      .menu-icon-img {
        position: relative;
        z-index: 10;
        width: 100%;
        height: 100%;
      }

      /* Pulse effect, for icon */
      &::before {
        content: " ";
        position: absolute;
        width: var(--icon-radius);
        height: var(--icon-radius);
        border-radius: var(--icon-radius);
        background-color: #fff971;
        transform: scale(0);
        transition: all 0.4s;
      }
    }
  }

  .menu-footer {
    flex-shrink: 0;
    padding: 1.25rem;

    /* Extends link surface to entire card container block */
    .menu-link::before {
      content: " ";
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
    }
  }

  /* Pulse effect blue */
  &::before {
    --radius: 300px;

    content: " ";
    position: absolute;
    width: var(--radius);
    height: var(--radius);
    border-radius: var(--radius);
    background-color: #0d47a1;

    opacity: 0;
    transform: translate(-40%, -50%) scale(0);
    transition: all 0.4s;
  }

  &:hover {
    box-shadow: 0 0.25rem 2rem rgb(18 38 63 / 10%);
    transform: translateY(-0.05rem);
    transition: all 0.4s;

    &::before {
      opacity: 0.08;
      transform: translate(-40%, -50%) scale(1);
    }

    .menu-icon::before {
      transform: scale(1.4);
    }
  }
`;

export default CardMenuWithButton;
