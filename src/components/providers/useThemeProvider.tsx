import { useEffect } from "react";

import { useTheme } from "@/hooks/useTheme";
import { checkWindowValidity } from "@/lib/auth/auth-storage";
import { themeConfigStorage } from "@/stores/browser-storage";

/**
 * Hook to set theme provider
 */
function useThemeProvider() {
  const { isDarkmode, changeThemeDark, changeTheme } = useTheme();

  useEffect(() => {
    if (checkWindowValidity()) {
      //get prev selected config from storage
      const themeConfig = themeConfigStorage.get();

      if (themeConfig) {
        const { theme, primaryColor = "default" } = themeConfig;
        //change theme after get from storage
        changeTheme({
          themeClass: theme
            ? theme
            : isDarkmode && isDarkmode.matches
              ? "theme-dark"
              : "default",
          primaryColorClass: primaryColor,
        });
      }
    }

    if (isDarkmode) {
      isDarkmode.addEventListener("change", changeThemeDark);
      return () => {
        isDarkmode.removeEventListener("change", changeThemeDark);
      };
    }
  }, []);
}

export default useThemeProvider;
