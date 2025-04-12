import { useState, type JSX } from "react";

export const useEditorDrawer = <T extends string>(
  targetMenu?: T,
  panelSize: "sm" | "md" | "lg" = "md",
) => {
  const [drawerMenu, setDrawerMenu] = useState<T | undefined>();
  const [isFullscreenDrawer, setIsFullscreenDrawer] = useState(false);

  const isOpen = !!drawerMenu;

  const sizes = {
    sm: [60, 45, 45],
    md: [65, 50, 50],
    lg: [70, 55, 55],
  };

  const [maxWidth, minWidth, defaultWidth] = drawerMenu
    ? isFullscreenDrawer
      ? [100, 100, 100]
      : sizes[panelSize]
    : [0, 0, 0];

  const renderMenuComponent = (menus: Record<T, JSX.Element>) => {
    return drawerMenu ? menus[drawerMenu] : null;
  };

  return {
    maxWidth,
    minWidth,
    defaultWidth,
    mainDefaultWidth: 100 - defaultWidth,
    isFullscreenDrawer,
    setIsFullscreenDrawer,
    isOpen,
    onOpen: (menu?: T) => setDrawerMenu(menu || targetMenu),
    onClose: () => setDrawerMenu(undefined),
    renderMenuComponent,
  };
};
