import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useGetCurrentWorkspaceStatus = () => {
  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  return useQuery({
    queryKey: QUERY_KEYS.workspaceAPI.getCurrentWorkspaceStatus(
      currentWorkspaceId!,
    ),
    queryFn: () => workspaceAPI.getUserWorkspaceInformation(),
    select: data => data.data,
    enabled: !!currentWorkspaceId,
  });
};

export default useGetCurrentWorkspaceStatus;
