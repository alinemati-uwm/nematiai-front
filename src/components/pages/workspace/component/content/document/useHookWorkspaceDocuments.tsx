import { useState } from "react";

import type workspaceDocumentsTypes from "./type";

function useHookWorkspaceDocuments() {
  const [states, setStates] = useState<workspaceDocumentsTypes["states"]>({
    tab: "chat_bot",
  });

  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  return { states, updateState };
}

export default useHookWorkspaceDocuments;
