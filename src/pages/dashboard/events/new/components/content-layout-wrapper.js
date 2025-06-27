import * as React from "react";
import styled from "styled-components";

import { Helmet } from "react-helmet-async";
import { Container } from "reactstrap";
import { BreadcrumbDashboard } from "../../components/breadcrumb";

function ContentLayoutWrapper({
  children,
  pageTitle,
  before,
  after,
  breadcrumbText,
  breadcrumbLink,
}) {
  return (
    <React.Fragment>
      <Helmet>
        {pageTitle ? <title>{pageTitle} | MyArchery.id</title> : <title>MyArchery.id</title>}
      </Helmet>

      {before}

      <StyledPageWrapper>
        <Container>
          <BreadcrumbDashboard to={breadcrumbLink || "#"}>
            {breadcrumbText || ""}
          </BreadcrumbDashboard>

          {children}
        </Container>
      </StyledPageWrapper>

      {after}
    </React.Fragment>
  );
}

const StyledPageWrapper = styled.div`
  margin: 2.5rem 0;
`;

export { ContentLayoutWrapper };
