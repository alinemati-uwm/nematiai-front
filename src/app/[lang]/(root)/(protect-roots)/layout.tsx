"use client";

import React, { useEffect } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";
import { useUiStore } from "@/stores/zustand/ui-store";
import adminPanelHoc from "@/hoc/adminPanelHoc";

import { type Locale } from "../../../../../i18n.config";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();
  const setActiveMenu = useUiStore.use.setUserPanelActiveMenu();

  const { queries } = useQueryParams();
  useEffect(() => {
    if (queries.settingMenu && queries.settingMenu !== "") {
      setIsOpen(true);
      setActiveMenu(queries.settingMenu);
    }
  }, [queries.settingMenu]);

  return (
    <>
      <div className="h-[100%] w-[100%] flex bg-holder-lighter ">
        {children}
      </div>
    </>
  );
}

export default adminPanelHoc(RootLayout);
