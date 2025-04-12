import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isEqual } from "lodash";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useRemoveCurrentWorkspaceMember = () => {
  const queryClient = useQueryClient();
  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  return useMutation({
    mutationFn: (memberId: number) =>
      workspaceAPI.deleteWorkspaceMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          const isCurrentWorkspaceMemberQuery = isEqual(
            query.queryKey,
            QUERY_KEYS.workspaceAPI.getCurrentWorkspaceMembers(
              currentWorkspaceId!,
            ),
          );

          const isCurrentWorkspaceStatusQuery = isEqual(
            query.queryKey,
            QUERY_KEYS.workspaceAPI.getCurrentWorkspaceStatus(
              currentWorkspaceId!,
            ),
          );

          return isCurrentWorkspaceMemberQuery || isCurrentWorkspaceStatusQuery;
        },
      });
    },
  });
};

export default useRemoveCurrentWorkspaceMember;
