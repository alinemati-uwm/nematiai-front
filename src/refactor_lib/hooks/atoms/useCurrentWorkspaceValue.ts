import { useAtomValue } from "jotai";

import { currentWorkspaceAtom } from "@/refactor_lib/atoms/currentWorkspaceAtom";

const useCurrentWorkspaceValue = () => {
  return useAtomValue(currentWorkspaceAtom);
};

export default useCurrentWorkspaceValue;
