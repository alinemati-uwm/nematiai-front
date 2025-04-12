import React, { useContext } from "react";

import WorkspaceContext from "../../context";
import WorkspaceApps from "./apps/WorkspaceApps";
import WorkspaceDocuments from "./document";

function WorkspaceContent() {
  // Access the current tab state from workspace context
  const {
    states: { tab },
  } = useContext(WorkspaceContext);

  // Render content based on the active tab
  return tab === "document" ? <WorkspaceDocuments /> : <WorkspaceApps />;
}

export default WorkspaceContent;
