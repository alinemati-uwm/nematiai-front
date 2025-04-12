"use client";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";

import useErrorToast from "@/hooks/useErrorToast";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

// import invalidateCurrentWorkspaceQueries from "@/refactor_lib/utils/invalidateCurrentWorkspaceQueries";

import useToaster from "../shared/useToaster";

const useDeleteWorkspace = () => {
  const { toaster } = useToaster();
  const { showError } = useErrorToast();
  // const queryClient = useQueryClient();

  const reload = useDebounceCallback(() => window.location.reload(), 1000);

  return useMutation({
    mutationFn: async (id?: number) => {
      if (id) {
        await workspaceAPI.deleteWorkspaceById(id.toString());
      } else {
        await workspaceAPI.deleteWorkspace();
      }
    },
    onSuccess: () => {
      // invalidateCurrentWorkspaceQueries(queryClient);
      toaster({
        toastProps: {
          type: "success",
          message: "Workspace has been successfully deleted",
        },
      });
      reload();
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      if (error.response) {
        showError(error.response.data.detail);
      } else {
        showError("Sorry! an unknown error occurred");
      }
    },
  });
};

export default useDeleteWorkspace;
