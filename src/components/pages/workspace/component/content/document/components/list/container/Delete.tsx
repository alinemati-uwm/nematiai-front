import React, { useContext } from "react";

import { useMutation } from "@tanstack/react-query";

import { DeleteAlertDialog, MinimalButton } from "@/components/shared";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import WorkspaceDocumentsContext from "../../../context";

type props = {
  id: number;
  refetch(): Promise<void>;
};

function WorkspaceDocumentDelete({ id, refetch }: props) {
  // Toaster for success/error messages
  const { toaster } = useToaster();

  // Get tab state from context
  const {
    states: { tab },
  } = useContext(WorkspaceDocumentsContext);

  // Mutation to delete workspace history
  const { mutate, isPending } = useMutation({
    mutationFn: workspaceAPI.deleteWorkspaceHistory,
    onSuccess: () => {
      // Show success toast and refetch data
      toaster({ toastProps: { type: "success", message: "" } });
      refetch();
    },
    onError: (error: any) => {
      // Show error toast in case of failure
      const message = error?.response?.data?.detail ?? error;
      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    },
  });

  // The DeleteAlertDialog is triggered by the trash icon, and it handles the submission of the mutation
  return (
    <DeleteAlertDialog
      title="Delete Workspace"
      description="Are you sure you want to delete this Document?"
      Trigger={
        <MinimalButton
          icon={isPending ? "eos-icons:loading" : "ic:outline-delete"}
          size="xs"
        />
      }
      handleSubmit={() => {
        // Execute the mutation with the workspace ID and tab
        mutate({ historyId: id, app_type: tab });
      }}
    />
  );
}

export default WorkspaceDocumentDelete;
