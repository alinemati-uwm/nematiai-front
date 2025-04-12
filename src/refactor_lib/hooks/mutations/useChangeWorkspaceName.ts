import { useMutation, useQueryClient } from "@tanstack/react-query";

import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import invalidateCurrentWorkspaceQueries from "@/refactor_lib/utils/invalidateCurrentWorkspaceQueries";

const useChangeWorkspaceName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workspaceAPI.updateWorkspaceName,
    onSuccess: () => {
      invalidateCurrentWorkspaceQueries(queryClient);
    },
  });
};

export default useChangeWorkspaceName;
