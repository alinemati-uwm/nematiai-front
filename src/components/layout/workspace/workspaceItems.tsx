"use client";

import * as React from "react";

import useCheckSidePanelOpen from "@/components/layout/siedebar/menues/hooks/useCheckSidePanelOpen";
import { CreateWorkspaceDialog } from "@/components/layout/workspace/CreateWorkspaceDialog";
import { DeleteAlertDialog, MinimalButton } from "@/components/shared";
import AppPopover from "@/components/shared/AppPopover";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn, getFirstLetter } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import useChangeDefaultWorkspace from "@/refactor_lib/hooks/mutations/useChangeDefaultWorkspace";
import useDeleteWorkspace from "@/refactor_lib/hooks/mutations/useDeleteWorkspace";
import { type WorkspaceAPIResponse } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

import WorkspaceInvite from "./Invite";
import WorkspaceLinks from "./Links";
import WorkspaceSetting from "./Setting";

/**
 * workspace select rendered in side panel if is open else rendered in header
 * @param isHeader for change size and hide it if side panel open
 * @constructor
 */
type WorkspaceItem = WorkspaceAPIResponse["getUserWorkspace"][number];

export function WorkspaceItems({
  isHeader = false,
  workspaces,
}: {
  isHeader?: boolean;
  workspaces: WorkspaceAPIResponse["getUserWorkspace"];
}) {
  const { mutate: changeDefaultWorkspace } = useChangeDefaultWorkspace();
  const { mutateAsync: deleteWorkSpace } = useDeleteWorkspace();
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  const defaultWorkspace = React.useMemo(() => {
    return workspaces.filter(ws => ws.is_default)[0];
  }, [workspaces]);

  /**
   * on select item change value and close select popover
   * @param workspaceId
   */
  const handleSelectWorkspace = (workspaceId: string) => {
    const parsedWorkspaceId = parseInt(workspaceId);
    const defaultWorkspace = workspaces.find(ws => ws.is_default);
    if (defaultWorkspace && defaultWorkspace.workspace.id === +workspaceId)
      return;
    changeDefaultWorkspace(parsedWorkspaceId);
  };

  const isSidePanelOpen = useCheckSidePanelOpen();

  const handleDelete = async (item: WorkspaceItem) => {
    await deleteWorkSpace(item.workspace.id);
  };

  return (
    <>
      <AppPopover
        trigger={
          <Button
            variant={isHeader || isSidePanelOpen ? "input" : "ghost"}
            color="input"
            spacing="input"
            role="combobox"
            className="w-full"
            element="div"
          >
            <div
              className={`gap-2 flex w-full flex-row ${isHeader || isSidePanelOpen ? "justify-between" : "justify-center"} items-center`}
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="centered-col h-6 w-6 rounded bg-holder-darker text-label-lighter">
                  {defaultWorkspace.id
                    ? getFirstLetter(defaultWorkspace.workspace.name)
                    : "W"}
                </div>
                {isHeader || isSidePanelOpen ? (
                  <div
                    className=" w-24 flex justify-start"
                    title={defaultWorkspace.workspace.name}
                  >
                    <AppTypo variant="headingXXS" className="truncate">
                      {defaultWorkspace.workspace.name}
                    </AppTypo>
                  </div>
                ) : null}
              </div>
              {isHeader || isSidePanelOpen ? (
                <MinimalButton
                  element="div"
                  icon="eva:arrow-down-fill"
                  variant="ghost"
                  size="sm"
                />
              ) : null}
            </div>
          </Button>
        }
        props={{
          content: {
            side: "top",
            align: "start",
            sideOffset: 5,
            className: cn(
              "text-primary z-40",
              isHeader ? "!w-44" : "!w-[220px]",
            ),
          },
          trigger: { className: "w-full" },
        }}
      >
        <Command className="rounded-none">
          <CommandList>
            {/*<CommandInput placeholder="Search workspaces..." />*/}
            <CommandEmpty>No Workspace found.</CommandEmpty>
            <CommandGroup className="p-0">
              {workspaces.map(ws => (
                <CommandItem
                  key={ws.workspace.id}
                  value={ws.workspace.id.toString()}
                  onSelect={handleSelectWorkspace}
                  className={cn(
                    "w-full py-2 text-primary truncate rounded-none cursor-pointer px-4 border-l-4 border-transparent !text-start !bg-transparent hover:!bg-primary-lighter",
                    ws.is_default &&
                      "!bg-active !text-primary-darker border-l-4 border-primary",
                  )}
                >
                  {ws.workspace.name}
                  <RenderIf isTrue={!ws.is_base && ws.role.title === "owner"}>
                    <div
                      className="ms-auto"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <DeleteAlertDialog
                        title={workspaceDictionary.delete_workspace_title}
                        description={
                          workspaceDictionary.delete_workspace_message
                        }
                        handleSubmit={() => handleDelete(ws)}
                        Trigger={
                          <MinimalButton
                            color="danger"
                            icon="ic:outline-delete"
                            className="ms-auto"
                            size="xs"
                          />
                        }
                      />
                    </div>
                  </RenderIf>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CreateWorkspaceDialog />
          <div className="border-t my-1"></div>
          <WorkspaceLinks />
          <WorkspaceInvite />
          <WorkspaceSetting />
        </Command>
      </AppPopover>
    </>
  );
}
