import { useEffect, useMemo } from "react";

import { WorkspaceRoleEnum } from "@/refactor_lib/types/enums/WorkspaceRoleEnum";

import useGetUserWorkspaces from "./useGetUserWorkspaces";

const useIsWorkspaceOwner = () => {
  const { data: userWorkspace, ...queryResult } = useGetUserWorkspaces();

  const isOwner = useMemo(() => {
    if (!queryResult.isSuccess) return false;

    const currentWorkspace = userWorkspace?.filter(
      workspace => workspace.is_default,
    )[0];

    return (
      currentWorkspace?.role.title.toLowerCase() ===
      WorkspaceRoleEnum.OWNER.toLowerCase()
    );
  }, [queryResult.isSuccess, queryResult.dataUpdatedAt]);

  useEffect(() => {}, [queryResult.isSuccess, queryResult.dataUpdatedAt]);

  return { isOwner, ...queryResult };
};

export default useIsWorkspaceOwner;
