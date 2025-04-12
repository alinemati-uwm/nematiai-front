import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useChangeCurrentWorkspaceMemberRole = () => {
  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, role }: { memberId: number; role: string }) =>
      workspaceAPI.changeMemberRole({
        member_id: memberId,
        role,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.workspaceAPI.getCurrentWorkspaceMembers(
          currentWorkspaceId!,
        ),
      });
    },
  });
};

export default useChangeCurrentWorkspaceMemberRole;
