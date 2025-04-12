"use client";

import { useCallback, useState } from "react";

import { themeConfigStorage } from "@/stores/browser-storage";
import { useUiStore } from "@/stores/zustand/ui-store";
import { type AppTheme, type PrimaryColor } from "@/types/theme";

interface IChangeThemeInput {
  themeClass?: AppTheme;
  primaryColorClass?: PrimaryColor;
}

/**
 * This is a custom React Hook that manages the theme and primary color of the application.
 * It uses the useState hook to store the current theme and primary color, and the useEffect hook to initialize these values.
 * On initialization, it checks if the application is running on the client side and if there are any previously selected theme and primary color stored in the local storage.
 * If there are, it applies these settings by calling the changeTheme function.
 * The changeTheme function accepts an object with optional themeClass and primaryColorClass properties.
 * It first removes any existing theme and primary color classes from the body element.
 * Then, it applies the new theme and primary color classes, if they are not 'default'.
 * Finally, it stores the new theme and primary color in the local storage and updates the state variables.
 *
 * @returns {Object} An object containing the current theme, the current primary color, and the function to change the theme.
 * @hook
 * @example
 * const { activeTheme, activePrimaryColor, changeTheme } = useTheme();
 */
export function useTheme() {
  //current selected primary color
  const [activePrimaryColor, setActivePrimaryColor] =
    useState<PrimaryColor>("default");
  //current selected theme
  const activeTheme = useUiStore.use.activeTheme();
  const setActiveTheme = useUiStore.use.setActiveTheme();

  const changeTheme = useCallback(
    ({ themeClass, primaryColorClass }: IChangeThemeInput) => {
      const body = document.body;
      //first remove prev selected class from body
      //both primary color and theme
      body.classList.forEach(clasName => {
        if (clasName.startsWith("theme-") || clasName.startsWith("primary-")) {
          body.classList.remove(clasName);
        }
      });

      //if theme not pass select current theme
      const theme = themeClass || activeTheme;
      //if primaryColor not pass select current primaryColor
      const primaryColor = primaryColorClass || activePrimaryColor;

      //default theme and primary color don't need to add to body class list
      if (theme !== "default") {
        body.classList.add(theme);
      }
      if (primaryColor !== "default") {
        body.classList.add(primaryColor);
      }

      //set theme and primaryColor to localstorage to use on page reload
      themeConfigStorage.set({
        theme,
        primaryColor,
      });
      //set theme and primaryColor to stage to change componets style like primary color check and theme border color
      setActiveTheme(theme);
      setActivePrimaryColor(primaryColor);
    },
    [activePrimaryColor, activeTheme, setActiveTheme],
  );

  const changeThemeDark = (e: any) => {
    changeTheme({
      primaryColorClass: "default",
      themeClass: e.matches ? "theme-dark" : "default",
    });
  };

  const isDarkmode =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)");

  /**
   * This function changes the theme and primary color of the application.
   * It first removes any existing theme and primary color classes from the body element.
   * Then, it applies the new theme and primary color classes, if they are not 'default'.
   * Finally, it stores the new theme and primary color in the local storage and updates the state variables.
   *
   * @param {IChangeThemeInput} themeClass - The class that will be added to the body class list to apply the color variant.
   * @param {IChangeThemeInput} primaryColorClass - The class that will be added to the body class list to apply the primary color variant.
   */

  return {
    activeTheme,
    activePrimaryColor,
    changeTheme,
    changeThemeDark,
    isDarkmode,
  };
}
