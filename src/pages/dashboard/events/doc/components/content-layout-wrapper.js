import * as React from "react";
import styled from "styled-components";

import { Helmet } from "react-helmet-async";
import { Container } from "reactstrap";
import { ProcessingToast, toast } from "./processing-toast";

function ContentLayoutWrapper({ children, pageTitle, navbar }) {
  // Buang toast yang kemungkinan masih tertinggal
  // ketika page di-unmount/pindah page
  React.useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        {pageTitle ? <title>{pageTitle} | MyArchery.id</title> : <title>MyArchery.id</title>}
      </Helmet>

      {navbar}

      <Container fluid>
        <ProcessingToast />
        <StyledPageWrapper>{children}</StyledPageWrapper>
      </Container>
    </React.Fragment>
  );
}

const StyledPageWrapper = styled.div`
  margin: 3.5rem 0;

  @media (min-width: 768px) {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export { ContentLayoutWrapper };
