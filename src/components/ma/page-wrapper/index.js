import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Breadcrumb } from "./components/breadcrumb";

function PageWrapper({ pageTitle, breadcrumb, children, className }) {
  return (
    <div className={className}>
      <Helmet>
        <title>{pageTitle} | MyArchery.id</title>
      </Helmet>

      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumb title={pageTitle} breadcrumbItem={breadcrumb} />
          {children}
        </div>
      </div>
    </div>
  );
}

PageWrapper.propTypes = {
  pageTitle: PropTypes.string,
  breadcrumb: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PageWrapper;
