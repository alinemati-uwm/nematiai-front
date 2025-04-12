import { useState } from "react";

import type appModelSelectorTypes from "../type";

function useHookModelSelector() {
  const [states, setStates] = useState<appModelSelectorTypes["state"]>({
    search: "",
    dropdown: false,
    setting: false,
    container: null,
    models: [],
  });

  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  return { states, updateState };
}

export default useHookModelSelector;
