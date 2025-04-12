import React from "react";

import { useGetDictionary } from "@/hooks";

import WorkspaceContainer from "./Container";

function WorkspaceLinks() {
  const {
    components: {
      workspace: { workspace_page },
      apps_header: { prompt_library },
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col">
      <WorkspaceContainer
        icon="mdi:open-in-browser"
        caption={workspace_page}
        route="/workspace"
      />
    </div>
  );
}

export default WorkspaceLinks;
