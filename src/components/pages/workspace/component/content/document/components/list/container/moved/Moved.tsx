import React, { useContext } from "react";

import WorkspaceContext from "@/components/pages/workspace/context";
import { MinimalButton } from "@/components/shared";
import AppPopover from "@/components/shared/AppPopover";

import DocumentMovedItem, { type documentMovedItemProps } from "./Item";

function WorkspaceDocuemntMoved(
  props: Pick<documentMovedItemProps, "refetch" | "document">,
) {
  // Context to get the list of workspaces
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <AppPopover
      trigger={
        <MinimalButton
          element="div"
          size="xs"
          icon="material-symbols:forward-rounded"
        />
      } // Trigger icon for the popover
      props={{
        content: { side: "right", sideOffset: 10, className: "flex flex-col" }, // Popover content styling
      }}
    >
      {/* Map through workspaces and render DocumentMovedItem for each */}
      {workspaces
        .filter(el => !el.is_default) // Exclude default workspaces
        .map((el, key) => (
          <DocumentMovedItem key={key} workspace={el} {...props} /> // Pass props to DocumentMovedItem
        ))}
    </AppPopover>
  );
}

export default WorkspaceDocuemntMoved;
