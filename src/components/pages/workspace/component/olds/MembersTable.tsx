"use client";

import { type WorkspaceMember } from "@/components/pages/workspace/component/olds/members";
import {
  DeleteAlertDialog,
  MinimalButton,
  SelectAndDrawer,
} from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { UserAvatar } from "@/components/user";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { useGetDictionary } from "@/hooks";
import useChangeCurrentWorkspaceMemberRole from "@/refactor_lib/hooks/mutations/useChangeCurrentWorkspaceMemberRole";
import useRemoveCurrentWorkspaceMember from "@/refactor_lib/hooks/mutations/useRemoveCurrentWorkspaceMember";

interface Props {
  members: WorkspaceMember[];
  isOwner: boolean;
  workspace_id: number;
}

type AccessLevel = "read" | "read-write";

const MembersTable = ({ members, isOwner }: Props) => {
  const {
    page: { workspace: dictionary },
  } = useGetDictionary();

  const accessLevel: Array<{ title: string; type: AccessLevel }> = [
    { title: dictionary.access_read, type: "read" },
    { title: dictionary.access_read_write, type: "read-write" },
  ];

  const { mutateAsync: mutateDetele } = useRemoveCurrentWorkspaceMember();
  //service for role change
  const { mutateAsync: mutateChangeRole } =
    useChangeCurrentWorkspaceMemberRole();

  // error and success toast components
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();

  const handleDeleteMember = async (id: number) => {
    await mutateDetele(id, {
      onSuccess: () => showSuccess(dictionary.delete_member_message),
      onError: error => showError(error?.message || "Request Failed"),
    });
  };

  const changeRole = async (val: "read" | "read-write", memberId: number) => {
    await mutateChangeRole(
      { role: val, memberId },
      {
        onSuccess: () => showSuccess(dictionary.change_role_message),
        onError: error => showError(error?.message || "Request Failed"),
      },
    );
  };

  return (
    <div className="flex h-full w-full flex-col  gap-2 relative overflow-hidden pb-1">
      <div className="flex w-full  flex-col overflow-hidden">
        <div className="flex h-10 w-full flex-row justify-between border-b sticky top-0 bg-holder-lighter z-10">
          <AppTypo>{dictionary.user_name}</AppTypo>
          <AppTypo>{dictionary.permissions}</AppTypo>
        </div>
        {members.length > 0 && (
          <div className="flex flex-col">
            {members.reverse().map(member => {
              return (
                <div
                  key={member.id}
                  className="flex flex-row justify-between border-b py-4"
                >
                  <div>
                    <div className="row gap-2" key={member.id}>
                      <UserAvatar
                        imageSrc={member.user.profile_image ?? undefined}
                        name={`${member.user.first_name} ${member.user.last_name}`}
                      />
                      <p className="font-normal capitalize">
                        {member.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center  justify-center  gap-4 rounded px-1 text-large">
                    {member.role.title === "owner" && (
                      <div className="rounded border bg-primary bg-gradient-to-r from-[#5285FF] to-[#DE8FFF] px-2 py-1 text-small text-white">
                        {dictionary.owner}
                      </div>
                    )}

                    {isOwner && member.role.title !== "owner" && (
                      <DeleteAlertDialog
                        title={dictionary.delete_member}
                        description={dictionary.this_will_remove}
                        handleSubmit={() => handleDeleteMember(member.id)}
                        Trigger={
                          <MinimalButton
                            color="danger"
                            element="div"
                            icon="ic:outline-delete"
                            size="xs"
                          />
                        }
                      />
                    )}
                    {member.role.title !== "owner" && isOwner ? (
                      <SelectAndDrawer
                        items={accessLevel.map(item => ({
                          id: item.type,
                          value: item.title,
                        }))}
                        itemValueClassName="text-small"
                        buttonStyle={
                          member.role.access_level.length === 1
                            ? "bg-[#ECFDF3] text-[#027A48]"
                            : "bg-[#FFF0F6] text-[#C30052]"
                        }
                        value={
                          member.role.access_level.length === 1
                            ? "read"
                            : "read-write"
                        }
                        setValue={val =>
                          changeRole(val as AccessLevel, member.id)
                        }
                      />
                    ) : (
                      member.role.title !== "owner" && (
                        <p
                          className={`px-3 py-2 text-small rounded border   ${member.role.access_level.length === 1 ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FFF0F6] text-[#C30052]"}`}
                        >
                          {member.role.access_level.length === 1
                            ? "Read"
                            : "Read and Write"}
                        </p>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersTable;
