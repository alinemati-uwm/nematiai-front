import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";

import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import type { WorkspaceAPIResponse } from "@/refactor_lib/types/api/v1/WorkspaceAPI";
import invalidateCurrentWorkspaceQueries from "@/refactor_lib/utils/invalidateCurrentWorkspaceQueries";
import { type CreateWSError } from "@/types/error-types";

import useToaster from "../shared/useToaster";

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const { toaster } = useToaster();
  return useMutation<
    AxiosResponse<WorkspaceAPIResponse["createWorkspace"]>,
    CreateWSError,
    string,
    unknown
  >({
    mutationFn: (name: string) => {
      return workspaceAPI.createWorkspace({ name });
    },
    onSuccess: () => {
      invalidateCurrentWorkspaceQueries(queryClient);
      toaster({
        toastProps: {
          type: "success",
          message: "Your new workspace has been successfully created",
        },
      });
    },
  });
};

export default useCreateWorkspace;
