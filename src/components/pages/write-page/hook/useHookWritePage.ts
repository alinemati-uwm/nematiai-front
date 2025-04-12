import { useState } from "react";

import type writePageTypes from "../type";

/**
 * Custom hook for managing the state of the write page.
 *
 * @returns Object The current state and a function to update the state.
 */
function useHookWritePage() {
  // Initialize the state with default values
  const [states, setStates] = useState<writePageTypes["states"]>({
    appType: "all_writer",
    data: [],
    search: null,
  });

  /**
   * Update a specific key in the state.
   *
   * @template T
   * @param {T} key - The key of the state to update.
   * @param {typeof states[T]} value - The new value for the specified key.
   */
  const updateState = <T extends keyof typeof states>(
    key: T,
    value: (typeof states)[T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  return { states, updateState };
}

export default useHookWritePage;
