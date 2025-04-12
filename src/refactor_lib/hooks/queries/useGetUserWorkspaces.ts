import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";
import LocalStorageManager from "@/refactor_lib/utils/LocalStorageManager";
import { logout } from "@/refactor_lib/utils/logout";

import useSetCurrentWorkspace from "../atoms/useSetCurrentWorkspace";
import useSetCurrentWorkspaceId from "../atoms/useSetCurrentWorkspaceId";

const useGetUserWorkspaces = () => {
  const setCurrentWorkspaceId = useSetCurrentWorkspaceId();
  const setCurrentWorkspace = useSetCurrentWorkspace();
  const { isSuccess, dataUpdatedAt, isError, data, ...otherQueryResults } =
    useQuery({
      queryKey: QUERY_KEYS.workspaceAPI.getUserWorkspaces(),
      queryFn: workspaceAPI.getUserWorkspace,
      select: data => data.data,
    });

  useEffect(() => {
    if (!isError) return;
    logout();
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;
    const currentWorkspace = data.filter(workspace => workspace.is_default)[0];
    setCurrentWorkspace(currentWorkspace);
    setCurrentWorkspaceId(currentWorkspace.workspace.id);
    const baseWorkspace = data.find(w => w.is_base);
    if (baseWorkspace) {
      LocalStorageManager.setRollbackWorkspaceId(baseWorkspace.workspace.id);
    }
  }, [isSuccess, dataUpdatedAt]);

  return {
    data,
    isSuccess,
    dataUpdatedAt,
    ...otherQueryResults,
  };
};

export default useGetUserWorkspaces;
