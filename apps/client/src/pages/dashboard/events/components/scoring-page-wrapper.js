import * as React from "react";

import PageWrapper from "components/ma/page-wrapper";
import { SubNavbar } from "./submenus-matches";

function ScoringPageWrapper({ children, pageTitle, isSelectionType }) {
  return (
    <>
      <SubNavbar isSelectionType={isSelectionType} />
      <PageWrapper pageTitle={pageTitle}>
        {children}
      </PageWrapper>
    </>
  );
}

export { ScoringPageWrapper };
