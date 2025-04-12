import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

const useGetWorkspaceStatus = (workspaceId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.workspaceAPI.getWorkspaceStatus(workspaceId),
    queryFn: () => workspaceAPI.getUserWorkspaceInformation(),
    select: data => data.data,
  });
};

export default useGetWorkspaceStatus;
