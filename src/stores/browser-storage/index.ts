import type { DirType, IThemeConfig } from "@/types/theme";

import BrowserStorage from "./storage";

export const dirInLocalStorage = new BrowserStorage<DirType>(
  "dir",
  "localStorage",
);

// used for keep the theme config in local storage to set in website first load
export const themeConfigStorage = new BrowserStorage<IThemeConfig>(
  "themeConfig",
  "localStorage",
);
