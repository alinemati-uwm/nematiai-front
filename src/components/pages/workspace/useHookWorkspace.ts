import { useState } from "react";

import type workspaceTypes from "./type";

function useHookWorkspace() {
  // State initialization with default values for 'tab' and 'search'
  const [states, setStates] = useState<workspaceTypes["states"]>({
    tab: "document", // Default tab value
    search: "", // Default search query
  });

  // Function to update the state dynamically based on key and value
  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  // Returning the state and the update function for external use
  return { states, updateState };
}

export default useHookWorkspace;
