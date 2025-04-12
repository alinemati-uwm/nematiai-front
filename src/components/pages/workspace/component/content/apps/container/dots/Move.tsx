import React, { useContext } from "react";

import WorkspaceContext from "@/components/pages/workspace/context";
import { DeleteAlertDialog } from "@/components/shared";
import AppPopover from "@/components/shared/AppPopover";
import useTransferCurrentWorkspaceApp from "@/refactor_lib/hooks/mutations/useTransferCurrentWorkspaceApp";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import AppsContainerContext from "../appsContainerContext";
import AppsContainerDotsBox from "./Box";

/**
 * AppsMove component
 *
 * This component provides the functionality to move an app to a different workspace.
 * It displays a popover with a list of available workspaces (excluding the default one),
 * allowing users to move the app by selecting a workspace.
 */
function AppsMove() {
  // Retrieve workspaces and app details from context
  const { workspaces } = useContext(WorkspaceContext);
  const { item, refetch } = useContext(AppsContainerContext);

  // Hook for handling the move operation
  const { mutateAsync } = useTransferCurrentWorkspaceApp();

  // Hook for displaying toast notifications
  const { toaster } = useToaster();

  /**
   * Handles moving the app to a different workspace.
   * @param workspace_id - The ID of the target workspace.
   */
  const moved = async (workspace_id: number) => {
    try {
      // Execute the mutation to transfer the app
      await mutateAsync({
        app_id: item.id,
        workspace_id,
      });
      // Refresh the workspace data after moving
      await refetch();
      // Show success notification
      toaster({
        toastProps: {
          type: "success",
          message: "App moved",
        },
      });
    } catch (error: any) {
      // Extract error message from the response
      const message = error?.response?.data?.detail ?? error;
      // Show error notification
      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    }
  };

  return (
    <AppPopover
      // The trigger button for opening the move options
      trigger={
        <AppsContainerDotsBox
          icon="material-symbols:forward-rounded"
          caption="Moved"
          onClick={() => {}}
        />
      }
      props={{
        content: {
          side: "right", // Position the popover to the right of the trigger
          sideOffset: 10, // Adds spacing between the trigger and the popover
          className: "flex flex-col", // Styles the popover as a vertical list
        },
      }}
    >
      {/* Render a list of workspaces excluding the default one */}
      {workspaces
        .filter(el => !el.is_default)
        .map((el, key) => (
          <DeleteAlertDialog
            key={key}
            title="Move App"
            description="Are you sure you want to move this app?"
            Trigger={<AppsContainerDotsBox caption={el.workspace.name} />}
            labelButton="Move"
            handleSubmit={async fn => {
              try {
                await moved(el.workspace.id); // Perform move operation
                fn(); // Close the dialog after successful move
              } catch (error) {
                fn(); // Close the dialog even if there's an error
              }
            }}
          />
        ))}
    </AppPopover>
  );
}

export default AppsMove;
