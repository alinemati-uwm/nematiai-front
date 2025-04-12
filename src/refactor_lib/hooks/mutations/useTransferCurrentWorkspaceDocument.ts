import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import { type WorkspaceAPIRequest } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useTransferCurrentWorkspaceDocument = () => {
  const queryClient = useQueryClient();
  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  return useMutation({
    mutationFn: (data: WorkspaceAPIRequest["moveDocumentToAnotherWorkspace"]) =>
      workspaceAPI.moveDocumentToAnotherWorkspace(currentWorkspaceId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.workspaceAPI.all, "current", "documents"],
      });
    },
  });
};

export default useTransferCurrentWorkspaceDocument;
