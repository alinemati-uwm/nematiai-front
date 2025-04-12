import React from "react";

import { useMutation } from "@tanstack/react-query";

import { DeleteAlertDialog } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";
import useCurrentWorkspaceIdValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceIdValue";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import {
  type WorkspaceAPIRequest,
  type WorkspaceAPIResponse,
} from "@/refactor_lib/types/api/v1/WorkspaceAPI";

export type documentMovedItemProps = {
  document: WorkspaceAPIResponse["getWorkspaceDocuments"][0];
  workspace: WorkspaceAPIResponse["getUserWorkspace"][0];
  refetch(): Promise<void>;
};
function DocumentMovedItem({
  document,
  refetch,
  workspace,
}: documentMovedItemProps) {
  // Get the current workspace ID value
  const currentWorkspaceID = useCurrentWorkspaceIdValue();

  // Fetching localized strings for various texts on the page
  const {
    page: {
      workspace: { moved_document, move_this_Document, move },
    },
  } = useGetDictionary();

  // Hook for showing toasts (notifications) in the UI
  const { toaster } = useToaster();

  // Mutation to handle moving a document to another workspace
  const { mutateAsync } = useMutation({
    // The mutation function that interacts with the workspace API
    mutationFn: (
      params: WorkspaceAPIRequest["moveDocumentToAnotherWorkspace"],
    ) =>
      workspaceAPI.moveDocumentToAnotherWorkspace(
        currentWorkspaceID ?? 0, // Use current workspace ID or fallback to 0
        params,
      ),
  });

  // Function to handle the document movement process
  const moved = async () => {
    try {
      // Move the document to the target workspace
      await mutateAsync({
        document_id: document.id, // Document to move
        workspace_id: workspace.workspace.id, // Target workspace ID
      });
      // Refetch data to update the UI after successful move
      await refetch();
    } catch (error: any) {
      // Handle errors that occur during the move operation
      const message = error?.response?.data?.detail ?? error;
      toaster({
        toastProps: {
          type: "error", // Display error notification
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    }
  };

  // Rendering the DeleteAlertDialog for confirming the document move
  return (
    <DeleteAlertDialog
      title={moved_document}
      description={move_this_Document}
      Trigger={
        <div className="w-full transition cursor-pointer hover:bg-muted-dark p-2">
          <AppTypo>{workspace.workspace.name}</AppTypo>
        </div>
      }
      labelButton={move}
      handleSubmit={async fn => {
        await moved(); // Call the move function
        fn(); // Close dialog after move
      }}
    />
  );
}

export default DocumentMovedItem;
