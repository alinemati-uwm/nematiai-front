import React from "react";

import WorkspaceModals from "./Modals";
import HeadSearch from "./Search";
import WorkspaceTabs from "./Tabs";

function WorkspaceHead() {
  return (
    // Container for the workspace header with responsive layout
    <div className="flex flex-col sm:flex-row gap-y-2 justify-between items-center">
      <WorkspaceTabs /> {/* Render tabs for workspace navigation */}
      <div className="flex flex-row justify-between w-full sm:justify-normal sm:w-auto gap-x-2 items-center">
        <HeadSearch /> {/* Render search component */}
        <WorkspaceModals /> {/* Render modals for workspace actions */}
      </div>
    </div>
  );
}

export default WorkspaceHead;
