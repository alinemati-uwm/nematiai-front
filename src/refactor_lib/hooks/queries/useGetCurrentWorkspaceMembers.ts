import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useGetCurrentWorkspaceMembers = () => {
  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  return useQuery({
    queryKey: QUERY_KEYS.workspaceAPI.getCurrentWorkspaceMembers(
      currentWorkspaceId!,
    ),
    queryFn: () => workspaceAPI.getWorkspaceMembers(),
    select: data => data.data,
    enabled: !!currentWorkspaceId,
  });
};

export default useGetCurrentWorkspaceMembers;
