import { useSetAtom } from "jotai";

import { currentWorkspaceAtom } from "@/refactor_lib/atoms/currentWorkspaceAtom";

const useSetCurrentWorkspace = () => {
  return useSetAtom(currentWorkspaceAtom);
};

export default useSetCurrentWorkspace;
