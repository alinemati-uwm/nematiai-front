"use client";

import { useCallback, useContext, useEffect } from "react";

import { DeleteAlertDialog } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { spacesTabs } from "@/constants/spaces";
import { useGetDictionary } from "@/hooks";
import LocalTabControlContext from "@/refactor_lib/contexts/localTabControlContext";
import useCurrentWorkspaceIdValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceIdValue";
import useCurrentWorkspaceValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceValue";
import useDeleteWorkspace from "@/refactor_lib/hooks/mutations/useDeleteWorkspace";
import useGetUserWorkspaces from "@/refactor_lib/hooks/queries/useGetUserWorkspaces";
import useIsWorkspaceOwner from "@/refactor_lib/hooks/queries/useIsWorkspaceOwner";

import ChangeWorkspaceName from "./ChangeWorkspaceName";
import TransferWorkspaceDialog from "./TransferWorkspaceDialog";
import { WorkspaceSettingItem } from "./WorkspaceSettingItem";

interface IProps {
  workspace_id: number;
  setOpen: (val: boolean) => void;
}

/**
 * settings tab content in workspace page
 * contains workspace settings like change name, transfer and delete workspace
 * @constructor
 */
export function WorkspaceSettings({ workspace_id, setOpen }: IProps) {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  const { mutateAsync: deleteWorkSpace } = useDeleteWorkspace();
  const { data: workspaces } = useGetUserWorkspaces();
  const { handleTabChange } = useContext(LocalTabControlContext);

  const currentWorkspaceId = useCurrentWorkspaceIdValue();
  const currentWorkspace = useCurrentWorkspaceValue();

  const deleteWorkspaceHandler = useCallback(
    async (fn: () => void) => {
      if (currentWorkspaceId) {
        try {
          await deleteWorkSpace(undefined);
        } catch (err) {
          console.log((err as any).response.data.detail);
        } finally {
          fn();
        }
      }
    },
    [currentWorkspaceId],
  );

  const { isOwner, isFetching } = useIsWorkspaceOwner();

  useEffect(() => {
    if (isFetching) return;
    if (!isOwner) {
      handleTabChange(spacesTabs[0].value)();
    }
  }, [isFetching, isOwner]);

  if (!isOwner) {
    return (
      <div className="bg-gray-100 border border-gray-200 rounded-md p-3">
        {workspaceDictionary.you_not_owner_workspace_this_page}
      </div>
    );
  }

  return (
    <div className=" col gap-4 ">
      <WorkspaceSettingItem title={workspaceDictionary.setting_name_label}>
        <ChangeWorkspaceName
          defaultWorkspaceName={
            workspaces
              ? workspaces.filter(ws => ws.is_default)[0].workspace.name
              : currentWorkspace?.workspace?.name
          }
        />
      </WorkspaceSettingItem>

      <WorkspaceSettingItem
        title={workspaceDictionary.setting_transfer_label}
        Action={<TransferWorkspaceDialog workspace_id={workspace_id} />}
      >
        <AppTypo variant="small">
          {workspaceDictionary.setting_transfer_description}
        </AppTypo>
      </WorkspaceSettingItem>

      <WorkspaceSettingItem
        title={workspaceDictionary.setting_delete_label}
        Action={
          <DeleteAlertDialog
            title={workspaceDictionary.delete_workspace_title}
            description={workspaceDictionary.delete_workspace_message}
            handleSubmit={deleteWorkspaceHandler}
            setOpen={setOpen}
          />
        }
      >
        <AppTypo variant="small">
          {workspaceDictionary.setting_delete_description}
        </AppTypo>
      </WorkspaceSettingItem>
    </div>
  );
}
