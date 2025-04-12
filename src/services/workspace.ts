import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import axiosClient from "@/services/axios-client";
import { type WorkspaceApp } from "@/services/types";

interface AddAppToWorkspace {
  app_id: number;
  workspace_id: number;
}

export function useDeleteApps() {
  const [workspaceId, setWorkspaceId] = useState<number>(0);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ app_id, workspace_id }: AddAppToWorkspace) => {
      setWorkspaceId(workspace_id);
      const { data } = await axiosClient.delete<WorkspaceApp>(
        `workspaces/delete_app_from_workspace/${app_id}/`,
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-apps", workspaceId],
      }); // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.workspaceAPI.all, "current", "apps"],
      });
    },
  });
}

interface MoveApp {
  app_id: number;
  workspace_id: number;
}

interface ConfirmInviteToWorkspace {
  email: string;
  token: string;
}

export function useConfirmInviteToWorkspace() {
  return useMutation<
    any,
    { response: { data: { detail: string } } },
    ConfirmInviteToWorkspace,
    unknown
  >({
    mutationFn: async ({ email, token }: ConfirmInviteToWorkspace) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        ConfirmInviteToWorkspace
      >(
        `/workspaces/confirm_invite_to_workspace_without_register/${token}/?email=${email}`,
      );
      return data;
    },
  });
}
