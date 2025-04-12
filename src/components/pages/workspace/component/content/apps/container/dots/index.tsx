import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppPopover from "@/components/shared/AppPopover";

import AppsDelete from "./Delete";
import AppsMove from "./Move";

/**
 * AppsContainerDots component
 *
 * This component renders a popover menu with additional options (e.g., move, delete).
 * It is triggered by a three-dot icon and displays action buttons inside the popover.
 */
function AppsContainerDots() {
  return (
    <AppPopover
      // Trigger button: Displays a three-dot icon
      trigger={<AppIcon icon="mage:dots" width={20} />}
      props={{
        content: {
          side: "right", // Positions the popover to the right of the trigger
          sideOffset: 10, // Adds spacing between the trigger and the popover
          className: "flex flex-col", // Styles the popover as a vertical list
        },
      }}
    >
      {/* Option to move the app to another location */}
      <AppsMove />
      {/* Option to delete the app */}
      <AppsDelete />
    </AppPopover>
  );
}

export default AppsContainerDots;
