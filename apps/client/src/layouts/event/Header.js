import React, { useState } from "react";
import PropTypes from "prop-types";
//i18n
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// reactstrap
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logo from "../../assets/images/logo.svg";
import megamenuImg from "../../assets/images/megamenu-img.png";
import NotificationDropdown from "../../components//TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../../components//TopbarDropdown/ProfileMenu";
// Import menuDropdown
import LanguageDropdown from "../../components/TopbarDropdown/LanguageDropdown";

const Header = ({ toggleLeftmenu, leftMenu, t }) => {
  const [menu, setMenu] = useState(false)
  const [isSearch] = useState(false)
  const [open, setOpen] = useState(false);

  const toggleTopDrawer = () => {
    setOpen(!open)
  }

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logo} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" height="17" />
              </span>
            </Link>
            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src={logoLightSvg} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoLight} alt="" height="19" />
              </span>
            </Link>
          </div>
          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
            data-toggle="collapse"
            onClick={() => {
              toggleLeftmenu(!leftMenu)
            }}
            data-target="#topnav-menu-content"
          >
            <i className="fa fa-fw fa-bars" />
          </button>
          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <span className="bx bx-search-alt" />
            </div>
          </form>
          <Dropdown
            className="dropdown-mega d-none d-lg-block ms-2"
            isOpen={menu}
            toggle={() => setMenu(!menu)}
          >
            <DropdownToggle
              className="btn header-item "
              caret
              tag="button"
            >
              {t("Mega Menu")} <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-megamenu">
              <Row>
                <Col sm={8}>
                  <Row>
                    <Col md={4}>
                      <h5 className="font-size-14 mt-0">
                        {t("UI Components")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{t("Lightbox")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Range Slider")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Sweet Alert")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Rating")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Forms")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Tables")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Charts")}</Link>
                        </li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5 className="font-size-14 mt-0">
                        {t("Applications")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{t("Ecommerce")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Calendar")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Email")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Projects")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Tasks")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Contacts")}</Link>
                        </li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5 className="font-size-14 mt-0">
                        {t("Extra Pages")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{t("Light Sidebar")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Compact Sidebar")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Horizontal layout")}</Link>
                        </li>
                        <li>
                          <Link to="#"> {t("Maintenance")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Coming Soon")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Timeline")}</Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
                <Col sm={4}>
                  <Row>
                    <Col sm={6}>
                      <h5 className="font-size-14 mt-0">
                        {t("UI Components")}
                      </h5>
                      <ul className="list-unstyled megamenu-list">
                        <li>
                          <Link to="#">{t("Lightbox")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Range Slider")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Sweet Alert")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Rating")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Forms")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Tables")}</Link>
                        </li>
                        <li>
                          <Link to="#">{t("Charts")}</Link>
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
              type="button"
              className="btn header-item noti-icon "
              id="page-header-search-dropdown"
              onClick={() => isSearch(!isSearch)}
            >
              <i className="mdi mdi-magnify" />
            </button>
            <div
              className={
                isSearch
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
                      placeholder={t("Search") + "..."}
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
              className="btn header-item noti-icon "
              onClick={() => {
                toggleFullscreen()
              }}
              data-toggle="fullscreen"
            >
              <i className="bx bx-fullscreen" />
            </button>
          </div>
          <NotificationDropdown />
          <ProfileMenu />
          <div className="dropdown d-inline-block">
            <button
              onClick={toggleTopDrawer} disabled={open}
              type="button"
              className="btn header-item noti-icon right-bar-toggle "
            >
              <i className="bx bx-cog bx-spin" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  toggleLeftmenu: PropTypes.func.isRequired,
  leftMenu: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default (withTranslation()(Header))
