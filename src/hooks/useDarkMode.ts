"use client";

import { useEffect, useState } from "react";

import { useUiStore } from "@/stores/zustand/ui-store";

/**
 * Custom hook to determine if the current theme is dark mode.
 *
 * This hook uses the Zustand store to get the active theme and checks if the theme is dark.
 * It also checks the user's system preference for dark mode.
 *
 * @returns boolean - A boolean indicating if the dark mode is active.
 *
 * @example
 * // Usage of useDarkMode hook
 * const isDarkMode = useDarkMode();
 * console.log(isDarkMode); // Output: true or false
 */
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  const theme = useUiStore.use.activeTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(
        theme
          ? theme === "theme-dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }
  }, [theme]);

  return isDark;
};

export default useDarkMode;
