"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import type { ConfirmInviteToWorkspaceSearchParams } from "@/app/[lang]/(root)/(protect-roots)/workspace/confirm_invite_to_workspace/page";
import { useGetDictionary } from "@/hooks";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { useConfirmInviteToWorkspace } from "@/services/workspace";

export default function ConfirmInviteWorkspace({
  searchParams,
}: {
  searchParams: ConfirmInviteToWorkspaceSearchParams;
}) {
  const { mutate, isError, isSuccess, error } = useConfirmInviteToWorkspace();
  const {
    page: { workspace: dictionary },
  } = useGetDictionary();

  const { toaster } = useToaster();

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    mutate(
      { email: searchParams.email, token: searchParams.token },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.workspaceAPI.all,
          });
        },
      },
    );
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toaster({
        toastProps: { type: "success", message: "successfully registered" },
      });
      router.replace("/workspace");
    }
    if (isError) {
      toaster({
        toastProps: { type: "error", message: error.response.data.detail },
      });
      router.replace("/workspace");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <h1 className="text-3xl animate-pulse">
        {!isSuccess && !isError && dictionary.confirm_workspace_message}
        {isSuccess && dictionary.confirmed_workspace_message}
      </h1>
    </div>
  );
}
