"use client";

import { useMemo, useState } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import useGetCurrentWorkspaceMembers from "@/refactor_lib/hooks/queries/useGetCurrentWorkspaceMembers";
import useGetCurrentWorkspaceStatus from "@/refactor_lib/hooks/queries/useGetCurrentWorkspaceStatus";
import useIsWorkspaceOwner from "@/refactor_lib/hooks/queries/useIsWorkspaceOwner";

import InviteWorkspace from "./InviteWorkspace";
import MembersSearchInvite from "./MembersSearchInvite";
import MembersStatus from "./MembersStatus";
import MembersTable from "./MembersTable";

/**
 * member tab content in workspace page
 * show all members and their permissions
 * @constructor
 */
export function WorkspaceMembers({ workspace_id }: { workspace_id: number }) {
  //get members of the workspace
  const {
    data: members,
    dataUpdatedAt,
    isFetching: isFetchingMembers,
  } = useGetCurrentWorkspaceMembers();

  const { data: workspaceStatus, isFetching: isFetchingStatus } =
    useGetCurrentWorkspaceStatus();

  //set if the user is the owner of the workspace or not for some actions like deleting and changing permissions
  const { isOwner } = useIsWorkspaceOwner();

  //searched word
  const [searchWord, setSearchWord] = useState("");

  //filter members with searched word
  const filteredMember = useMemo(() => {
    return members
      ? !searchWord
        ? members
        : members.filter(member =>
            member.user.username
              .toLowerCase()
              .trim()
              .includes(searchWord.trim().toLowerCase()),
          )
      : null;
  }, [searchWord, dataUpdatedAt]);
  const {
    page: {
      workspace: { no_user_found },
    },
  } = useGetDictionary();
  return (
    <>
      {
        <div className="max-h-page flex w-full flex-col gap-6 py-2  ">
          {/*members status and count*/}
          <InviteWorkspace workspace_id={workspace_id} />
          <div className="w-full">
            <MembersStatus
              isPending={isFetchingStatus}
              workspaceStatus={workspaceStatus}
            />
          </div>
          <div className="w-full">
            <MembersSearchInvite
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              members={filteredMember}
            />
          </div>
          <div
            className={cn(
              "flex w-full flex-col gap-5 max-h-[200px] overflow-y-scroll ",
              isFetchingMembers && "h-[200px] bg-muted animate-pulse",
            )}
          >
            {/*members invite and search*/}

            {/*members table list*/}
            {!isFetchingMembers &&
              filteredMember &&
              filteredMember?.length > 0 && (
                <MembersTable
                  members={filteredMember}
                  isOwner={isOwner}
                  workspace_id={workspace_id}
                />
              )}
            {!isFetchingMembers &&
              (!filteredMember || filteredMember.length === 0) && (
                <div className="flex flex-col flex-grow justify-center">
                  <p className="flex justify-center">
                    <AppTypo variant="headingXS">{no_user_found}</AppTypo>
                  </p>
                </div>
              )}
          </div>
        </div>
      }
    </>
  );
}
