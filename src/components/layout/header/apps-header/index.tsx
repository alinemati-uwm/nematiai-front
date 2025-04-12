"use client";

import React from "react";

import { iconVariants } from "@/components/icons";
import HighlightSheet from "@/components/layout/header/apps-header/highlight/highlight-sheet";
import { TabButtons } from "@/components/layout/header/apps-header/tabs-buttons";
import { Workspace } from "@/components/layout/workspace";
import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/zustand/ui-store";
import { type headerContent } from "@/constants/header-content";
import { useGetDictionary } from "@/hooks";

import { DocumentSheet } from "./DocumentSheet";
import { HistorySheet } from "./history-sheet";

type HeaderContentType = typeof headerContent;
type AppType = HeaderContentType["apps"][keyof HeaderContentType["apps"]];

export function AppsHeader(props: AppType) {
  const { title: appTitle } = props;
  const isOpen = useUiStore.use.openUserPanelDialog();
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();
  const setActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const {
    components: { apps_header },
  } = useGetDictionary();
  type AppTitleType = keyof typeof apps_header;

  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col items-start md:items-center md:gap-2 md:flex-row-reverse md:justify-end flex-1 ">
        <h6 className="text-base md:text-large font-semibold md:order-2 order-1">
          {apps_header[appTitle as AppTitleType]}
        </h6>
        <div className="md:order-1 order-2">
          <Workspace />
        </div>
      </div>
      {/* tabs button (run , info)*/}
      <div className="hidden md:block">
        <TabButtons />
      </div>
      <div className="flex flex-1 gap-2 flex-row-reverse">
        {/*history button that when click on it ,Sheet open and show history content*/}
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            setActiveMenu("upgrade");
          }}
          className="px-2.5 md:px-4 h-8 upgrade bg-gradient-to-r from-[#5285FF] to-[#DE8FFF]   "
        >
          <AppIcon
            icon="lets-icons:dimond-alt"
            className={iconVariants({ size: "md" })}
          />
          <span className="ms-1.5 hidden md:block">{apps_header.upgrade}</span>
        </Button>
        {props.history && <HistorySheet />}
        {props.document && <DocumentSheet />}
        {props.highlight && <HighlightSheet />}
      </div>
    </div>
  );
}
