import React, { useState } from "react";
import PropTypes from "prop-types";
//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import megamenuImg from "../../assets/images/megamenu-img.png";
// Import menuDropdown
import LanguageDropdown from "../../components/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../../components/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../../components/TopbarDropdown/ProfileMenu";

const Header = (props) => {
  const [search, setsearch] = useState(false);
  const [megaMenu, setmegaMenu] = useState(false);
  const [open, setOpen] = useState(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

  function tToggle() {
    const body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <button
            type="button"
            onClick={() => {
              tToggle();
            }}
            className="btn btn-sm px-3 font-size-16 header-item "
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars" />
          </button>

          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder={props.t("Search") + "..."}
              />
              <span className="bx bx-search-alt" />
            </div>
          </form>

          <Dropdown
            className="dropdown-mega d-none d-lg-block ms-2"
            isOpen={megaMenu}
            toggle={() => {
              setmegaMenu(!megaMenu);
            }}
          >
            <DropdownToggle className="btn header-item " caret tag="button">
              {" "}
              {props.t("Mega Menu")} <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-megamenu">
              <Row>
                <Col sm={8}>
                  <Row>
                    <Col md={4}>
                      <h5 className="font-size-14 mt-0">
                        {props.t("UI Components")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{props.t("Lightbox")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Range Slider")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Sweet Alert")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Rating")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Forms")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Tables")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Charts")}</Link>
                        </li>
                      </ul>
                    </Col>

                    <Col md={4}>
                      <h5 className="font-size-14 mt-0">
                        {props.t("Applications")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{props.t("Ecommerce")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Calendar")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Email")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Projects")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Tasks")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Contacts")}</Link>
                        </li>
                      </ul>
                    </Col>

                    <Col md={4}>
                      <h5 className="font-size-14 mt-0">
                        {props.t("Extra Pages")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{props.t("Light Sidebar")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Compact Sidebar")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Horizontal layout")}</Link>
                        </li>
                        <li>
                          <Link to="#"> {props.t("Maintenance")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Coming Soon")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Timeline")}</Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4}>
                  <Row>
                    <Col sm={6}>
                      <h5 className="font-size-14 mt-0">
                        {props.t("UI Components")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{props.t("Lightbox")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Range Slider")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Sweet Alert")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Rating")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Forms")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Tables")}</Link>
                        </li>
                        <li>
                          <Link to="#">{props.t("Charts")}</Link>
                        </li>
                      </ul>
                    </Col>

                    <Col sm={5}>
                      <div>
                        <img
                          src={megamenuImg}
                          alt=""
                          className="img-fluid mx-auto d-block"
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex">
          <div className="dropdown d-inline-block d-lg-none ms-2">
            <button
              onClick={() => {
                setsearch(!search);
              }}
              type="button"
              className="btn header-item noti-icon "
              id="page-header-search-dropdown"
            >
              <i className="mdi mdi-magnify" />
            </button>
            <div
              className={
                search
                  ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                  : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              }
              aria-labelledby="page-header-search-dropdown"
            >
              <form className="p-3">
                <div className="form-group m-0">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search ..."
                      aria-label="Recipient's username"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <LanguageDropdown />

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <button
              type="button"
              onClick={() => {
                toggleFullscreen();
              }}
              className="btn header-item noti-icon "
              data-toggle="fullscreen"
            >
              <i className="bx bx-fullscreen" />
            </button>
          </div>

          <NotificationDropdown />
          <ProfileMenu />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            disabled={open}
            className="btn header-item noti-icon right-bar-toggle dropdown d-inline-block"
          >
            <i className="bx bx-cog bx-spin" />
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Header);
