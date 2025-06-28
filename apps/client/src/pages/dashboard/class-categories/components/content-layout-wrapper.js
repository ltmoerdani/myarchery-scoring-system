import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Container } from "reactstrap";
import Breadcrumb from "components/Common/Breadcrumb";

function ContentLayoutWrapper({ pageTitle, breadcrumbText, children }) {
  return (
    <div className="page-content">
      <Helmet>
        <title>{pageTitle} | MyArchery.id</title>
      </Helmet>
      <Container fluid>
        <Breadcrumb breadcrumbText={breadcrumbText} />
        {children}
      </Container>
    </div>
  );
}

ContentLayoutWrapper.propTypes = {
  pageTitle: PropTypes.string,
  breadcrumbText: PropTypes.string,
  children: PropTypes.node,
};

export { ContentLayoutWrapper };
