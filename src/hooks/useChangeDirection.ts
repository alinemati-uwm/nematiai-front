"use client";

import { useState } from "react";

import { dirInLocalStorage } from "@/stores/browser-storage";

/**
 * A hook to change the direction of the application.
 *
 * @returns Object An object containing the current direction and a function to change it.
 *
 * @example
 * const { changeDir, dirState } = useChangeDirection();
 */
export function useChangeDirection() {
  const [dirState, setDir] = useState(dirInLocalStorage.get().dir ?? "ltr");

  function changeDir(dir: "ltr" | "rtl") {
    document.documentElement.dir = dir;
    dirInLocalStorage.set({ dir });
    setDir(dir);
  }

  return { changeDir, dirState };
}
