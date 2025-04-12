import { useMutation } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks/useQueryParams";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

const useChangeDefaultWorkspace = () => {
  const { reloadPage } = useQueryParams();

  return useMutation({
    mutationFn: (workspaceId: number) => {
      return workspaceAPI.changeWorkspaceToDefault(workspaceId);
    },
    onSettled: () => {
      reloadPage();
      window.location.reload();
    },
  });
};

export default useChangeDefaultWorkspace;
