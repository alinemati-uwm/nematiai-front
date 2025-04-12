import React, { useContext } from "react";

import { DeleteAlertDialog } from "@/components/shared";
import useCurrentWorkspaceIdValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceIdValue";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { useDeleteApps } from "@/services/workspace";

import AppsContainerContext from "../appsContainerContext";
import AppsContainerDotsBox from "./Box";

/**
 * AppsDelete component
 *
 * This component allows users to delete an app from the current workspace.
 * It provides a confirmation dialog before performing the delete operation.
 */
function AppsDelete() {
  // Retrieve app data and refetch function from context
  const { item, refetch } = useContext(AppsContainerContext);

  // Hook for deleting the app
  const { mutateAsync, isPending } = useDeleteApps();

  // Get the current workspace ID
  const currentWorkspaceID = useCurrentWorkspaceIdValue();

  // Hook for displaying toast notifications
  const { toaster } = useToaster();

  /**
   * Handles deleting the app from the current workspace.
   */
  const deleted = async () => {
    try {
      // Ensure workspace ID is available before proceeding
      if (!currentWorkspaceID) throw Error("Not found workspace id");

      // Execute the delete mutation
      await mutateAsync({
        app_id: item.app.id,
        workspace_id: currentWorkspaceID,
      });

      // Refresh the workspace data after deletion
      refetch();
    } catch (error: any) {
      // Extract error message from response
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
    <DeleteAlertDialog
      title="Delete App"
      description="Are you sure you want to delete this app?"
      Trigger={
        <AppsContainerDotsBox
          icon={isPending ? "eos-icons:loading" : "iconoir:trash"}
          caption="Delete"
        />
      }
      handleSubmit={async fn => {
        try {
          await deleted(); // Perform delete operation
          fn(); // Close the dialog after successful deletion
        } catch (error) {
          fn(); // Close the dialog even if there's an error
        }
      }}
    />
  );
}

export default AppsDelete;
