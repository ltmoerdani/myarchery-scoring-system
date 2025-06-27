import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

function AuthLayout({ children }) {
  return (
    <div>
      <Container fluid className="p-0">
        {children}
      </Container>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default withRouter(AuthLayout);
