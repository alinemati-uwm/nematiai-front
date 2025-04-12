import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { useAtomValue } from "jotai";

import { currentWorkspaceIdAtom } from "@/refactor_lib/atoms/currentWorkspaceIdAtom";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import { type WorkspaceAPIRequest } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

const useInviteMemberToCurrentWorkspace = (workspaceId: number) => {
  const currentWorkspaceId = useAtomValue(currentWorkspaceIdAtom);
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<any, any>,
    { response: { data: { detail: string } } },
    Omit<WorkspaceAPIRequest["inviteToWorkspace"], "workspace_id">,
    unknown
  >({
    mutationFn: (
      data: Omit<WorkspaceAPIRequest["inviteToWorkspace"], "workspace_id">,
    ) => {
      return workspaceAPI.inviteToWorkspace({
        workspace_id: workspaceId,
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.workspaceAPI.getCurrentWorkspaceStatus(
          currentWorkspaceId!,
        ),
      });
    },
  });
};

export default useInviteMemberToCurrentWorkspace;
