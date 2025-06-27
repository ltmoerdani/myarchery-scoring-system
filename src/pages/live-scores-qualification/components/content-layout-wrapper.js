import * as React from "react";
import styled from "styled-components";

import { Helmet } from "react-helmet-async";

function ContentLayoutWrapper({ children, pageTitle }) {
  return (
    <React.Fragment>
      <Helmet>
        {pageTitle ? <title>{pageTitle} | MyArchery.id</title> : <title>MyArchery.id</title>}
      </Helmet>
      <StyledPageWrapper>{children}</StyledPageWrapper>
    </React.Fragment>
  );
}

const StyledPageWrapper = styled.div`
  height: 100%;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  > *:nth-child(1) {
    flex-shrink: 0;
  }

  > *:nth-child(2) {
    flex-grow: 1;
  }
`;

export { ContentLayoutWrapper };
