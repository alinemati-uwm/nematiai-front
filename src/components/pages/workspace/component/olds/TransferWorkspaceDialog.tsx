"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { SelectAndDrawer } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetDictionary } from "@/hooks";
import useTransferWorkspaceOwnership from "@/refactor_lib/hooks/mutations/useTransferWorkspaceOwnership";
import useGetCurrentWorkspaceMembers from "@/refactor_lib/hooks/queries/useGetCurrentWorkspaceMembers";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

/**
 * transfer workspace to other members dialog used in workspace settings dialog
 * @constructor
 */
function TransferWorkspaceDialog({ workspace_id }: { workspace_id: number }) {
  //set the user that is chosen to be the new owner
  const [memberEmail, setMemberEmail] = useState<string | null>(null);

  //show toaster
  const { toaster } = useToaster();

  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  const { data: members, refetch } = useGetCurrentWorkspaceMembers();

  const {
    mutate: transferOwnershipTo,
    isError: IsTransferOwnerShipError,
    isSuccess: isTransferredOwnershipSuccess,
    isPending: transferingIsPending,
    error,
  } = useTransferWorkspaceOwnership();

  //router to refresh page after ownership transfer
  const router = useRouter();

  //show toast for transfer owner
  useEffect(() => {
    if (isTransferredOwnershipSuccess) {
      toaster({
        toastProps: {
          type: "success",
          message: workspaceDictionary.changeWorkspace_message,
        },
      });
      router.push("/workspace");
    }
    if (IsTransferOwnerShipError) {
      toaster({
        toastProps: { type: "error", message: error.message },
      });

      router.push("/workspace");
    }
  }, [isTransferredOwnershipSuccess, IsTransferOwnerShipError]);

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = useCallback(async () => {
    const newMemberId = members!.filter(
      member => member.user.email === memberEmail,
    );
    newMemberId.length === 1 &&
      transferOwnershipTo({ workspace_id, member_id: newMemberId[0].id });
  }, [memberEmail, transferOwnershipTo, workspace_id]);

  const isOnlyMember = !members || members?.length === 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title={
            isOnlyMember ? workspaceDictionary.only_member_message : undefined
          }
        >
          {workspaceDictionary.setting_transfer_label}
        </Button>
      </DialogTrigger>
      <DialogContent className="!p-4 !m-0 max-w-sm">
        <DialogHeader>
          <div className="spacing-row">
            <DialogTitle>
              {workspaceDictionary.transfer_workspace_title}
            </DialogTitle>
            <DialogClose>
              <AppIcon icon="ic:outline-close" width={16} height={16} />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="col gap-5 pt-2 ">
          <div className="w-full">
            {members && (
              <SelectAndDrawer
                value={memberEmail ? memberEmail : ""}
                setValue={val => {
                  setMemberEmail(val);
                }}
                items={members
                  .filter(member => member.role.title !== "owner")
                  .map(item => item.user.email)}
              />
            )}
          </div>
          <Button
            isPending={transferingIsPending}
            onClick={handleSubmit}
            className="w-fit ms-auto"
          >
            {workspaceDictionary.setting_transfer_label}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TransferWorkspaceDialog;
