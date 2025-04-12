import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

const useDeleteCurrentWorkspaceDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workspaceAPI.deleteWorkspaceHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.workspaceAPI.all, "current", "documents"],
      });
    },
  });
};

export default useDeleteCurrentWorkspaceDocument;
