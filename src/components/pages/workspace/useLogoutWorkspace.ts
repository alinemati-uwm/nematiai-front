"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";

import useErrorToast from "@/hooks/useErrorToast";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import invalidateCurrentWorkspaceQueries from "@/refactor_lib/utils/invalidateCurrentWorkspaceQueries";

const useLogoutWorkspace = () => {
  const { toaster } = useToaster();
  const { showError } = useErrorToast();
  const queryClient = useQueryClient();

  const reload = useDebounceCallback(() => window.location.reload(), 1000);

  return useMutation({
    mutationFn: workspaceAPI.leaveWorkspaceById,
    onSuccess: () => {
      invalidateCurrentWorkspaceQueries(queryClient);
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

export default useLogoutWorkspace;
