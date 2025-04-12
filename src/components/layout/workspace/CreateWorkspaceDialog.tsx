"use client";

import { useEffect, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import useCreateWorkspace from "@/refactor_lib/hooks/mutations/useCreateWorkspace";

import WorkspaceContainer from "./Container";

//create new workspace dialog open by click on workspaces combobox

export function CreateWorkspaceDialog() {
  const [workspaceName, setWorkspaceName] = useState("");
  const { showError } = useErrorToast();
  const [modal, setModal] = useState(false);
  const workspaceDictionary = useGetDictionary().components.workspace;

  const {
    mutateAsync: createWorkspaceMutation,
    isError,
    error,
    isPending,
  } = useCreateWorkspace();

  const createNewFromHandler = async () => {
    try {
      await createWorkspaceMutation(workspaceName);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      showError(error?.response.data.detail);
    }
  }, [isError]);

  return (
    <>
      <WorkspaceContainer
        onClick={() => setModal(true)}
        icon="lets-icons:add-ring"
        caption={workspaceDictionary.workspace_new_button_label}
      />
      <Dialog open={modal} onOpenChange={() => setModal(false)}>
        <DialogContent className="max-w-sm rounded">
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              {workspaceDictionary.workspace_create_dialog_title}
              <AppIcon
                icon="ic:outline-close"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => setModal(false)}
              />
            </DialogTitle>
          </DialogHeader>
          <Input
            value={workspaceName}
            onChange={e => setWorkspaceName(e.target.value)}
            placeholder={workspaceDictionary.workspace_create_input_placeholder}
            className="my-2"
            maxLength={20}
            minLength={3}
          />
          <DialogFooter>
            <Button
              disabled={workspaceName.length === 0}
              type="submit"
              onClick={createNewFromHandler}
            >
              {isPending
                ? "Creating..."
                : workspaceDictionary.workspace_create_dialog_button_label}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
