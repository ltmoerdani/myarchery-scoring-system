import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Breadcrumb } from "./components/breadcrumb";

function PageWrapper({ pageTitle, breadcrumb, children, className, navbar }) {
  return (
    <div className={className}>
      <Helmet>
        <title>{pageTitle} | MyArchery.id</title>
      </Helmet>
      {navbar && <div className="subnavbar-container">{navbar}</div>}
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
  navbar: PropTypes.node,
};

export default PageWrapper;
