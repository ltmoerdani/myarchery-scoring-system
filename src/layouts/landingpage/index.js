import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Functional Component untuk LandingPageLayout
function LandingPageLayout({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}

// Definisi prop types untuk komponen
LandingPageLayout.propTypes = {
  children: PropTypes.any,
};

// Membungkus komponen dengan withRouter untuk mendapatkan akses ke props history
export default withRouter(LandingPageLayout);
