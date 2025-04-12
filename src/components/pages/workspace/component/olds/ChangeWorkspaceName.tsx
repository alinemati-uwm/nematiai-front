"use client";

import { useEffect, useState } from "react";

import ChangeNameInput from "@/components/shared/ChangeNameInput";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import useCurrentWorkspaceValue from "@/refactor_lib/hooks/atoms/useCurrentWorkspaceValue";
import useChangeWorkspaceName from "@/refactor_lib/hooks/mutations/useChangeWorkspaceName";

/**
 * edit workspace name dialog used in workspace settings dialog
 * @constructor
 */
function ChangeWorkspaceName({
  defaultWorkspaceName,
}: {
  defaultWorkspaceName: string | null | undefined;
}) {
  const currentWorkspace = useCurrentWorkspaceValue();
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    setCurrentName(
      defaultWorkspaceName
        ? defaultWorkspaceName
        : currentWorkspace?.workspace?.name || "",
    );
  }, [defaultWorkspaceName, currentWorkspace]);

  const { showError } = useErrorToast();
  const { showSuccess } = useSuccessToast();
  // custom hook for changing workspace name

  const {
    mutateAsync: updateWorkspaceName,
    isError: updateWorkspaceNameIsError,
    isSuccess: updateWorkspaceNameIsSuccess,
  } = useChangeWorkspaceName();

  // form submit handler

  const handleSubmit = async (newName: string) => {
    if (currentWorkspace) {
      try {
        await updateWorkspaceName({ name: newName });
        setCurrentName(newName);
      } catch (e) {
        showError("could not update workspace name");
      }
    } else showError("No Workspace Found");
  };

  useEffect(() => {
    updateWorkspaceNameIsSuccess && showSuccess("workspace name is updated");
    updateWorkspaceNameIsError && showError("could not update workspace name");
  }, [updateWorkspaceNameIsError, updateWorkspaceNameIsSuccess]);

  return (
    <ChangeNameInput
      className="!w-full"
      rootClassName="!w-full"
      showEdit={true}
      onSave={handleSubmit}
      value={currentName}
    />
  );
}

export default ChangeWorkspaceName;
