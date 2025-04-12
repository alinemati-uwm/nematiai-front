import { useAtomValue } from "jotai";

import { currentWorkspaceIdAtom } from "@/refactor_lib/atoms/currentWorkspaceIdAtom";

const useCurrentWorkspaceIdValue = () => {
  return useAtomValue(currentWorkspaceIdAtom);
};

export default useCurrentWorkspaceIdValue;
