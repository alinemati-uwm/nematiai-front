"use client";

import React, { useState } from "react";

import { SelectAndDrawer } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";
import useInviteMemberToCurrentWorkspace from "@/refactor_lib/hooks/mutations/useInviteMemberToCurrentWorkspace";
import useIsWorkspaceOwner from "@/refactor_lib/hooks/queries/useIsWorkspaceOwner";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

interface IProps {
  workspace_id: number;
}

const invitePermissions = [
  { title: "Read", type: "read" },
  { title: "Read/Write", type: "read-write" },
];

function InviteWorkspace({ workspace_id }: IProps) {
  const { isOwner } = useIsWorkspaceOwner();
  const [email, setEmail] = useState("");
  const { toaster } = useToaster();
  const [invitePermission, setInvitePermission] = useState(
    invitePermissions[0].title,
  );

  const { mutateAsync, isPending } =
    useInviteMemberToCurrentWorkspace(workspace_id);

  const InviteMemberHandler = async () => {
    try {
      if (email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toaster({
          toastProps: { type: "error", message: "Please check email" },
        });

        return;
      }

      await mutateAsync({
        email,
        role: invitePermissions.filter(
          perm => perm.title === invitePermission,
        )[0].type,
      });

      toaster({ toastProps: { type: "success", message: "Email is sent" } });
      setEmail("");
    } catch (error: any) {
      const detail = error?.response?.data?.detail;

      toaster({
        toastProps: {
          type: "error",
          message:
            typeof detail === "string"
              ? detail
              : (detail[0].msg ?? "Somthing went wrong"),
        },
      });
    }
  };
  const {
    page: {
      workspace: { invite_member, invite_new_member },
    },
  } = useGetDictionary();
  return (
    <>
      {isOwner ? (
        <div className="flex flex-col gap-label-space">
          <AppTypo>{invite_member}</AppTypo>
          <div className="relative ">
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Email"
                icon="mdi:email-outline"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div className="h-10 w-[150px]">
                <SelectAndDrawer
                  itemValueClassName="text-small"
                  buttonStyle="h-10"
                  value={invitePermission}
                  setValue={val => {
                    setInvitePermission(val);
                  }}
                  items={invitePermissions.map(item => item.title)}
                />
              </div>
            </div>
          </div>
          <Button
            variant="default"
            disabled={email.length <= 0}
            className="bg-primary hover:bg-primary-dark py-5 px-3"
            onClick={InviteMemberHandler}
            isPending={isPending}
          >
            {invite_new_member}
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default InviteWorkspace;
