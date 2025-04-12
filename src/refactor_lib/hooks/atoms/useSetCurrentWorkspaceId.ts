import { useSetAtom } from "jotai";

import { currentWorkspaceIdAtom } from "@/refactor_lib/atoms/currentWorkspaceIdAtom";

const useSetCurrentWorkspaceId = () => {
  return useSetAtom(currentWorkspaceIdAtom);
};

export default useSetCurrentWorkspaceId;
