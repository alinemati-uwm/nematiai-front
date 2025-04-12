"use client";

import React from "react";

import { useRouter } from "next/navigation";

import SidebarRoadmap from "@/components/layout/siedebar/content/SidebarRoadmap";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { UserPanel } from "@/components/user";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useUiStore } from "@/stores/zustand/ui-store";

import useAppLayout from "../hook/useAppLayout";
import { type typeHeaderOfFirstLevel } from "../types";
import { Workspace } from "../workspace";
import { DocumentSheet } from "./apps-header/DocumentSheet";
import HeaderProfile from "./apps-header/HeaderProfile";
import { HistorySheet } from "./apps-header/history-sheet";
import UpgradeHeader from "./apps-header/Upgrade";

export function Header({
  customComponent,
  document,
  history,
  workspace,
  profile,
  title,
  upgrade,
  back,
  roadmap,
}: typeHeaderOfFirstLevel) {
  const toggleIsSidePanelOpen = useUiStore.use.toggleIsSidePanelOpen();
  const { infoBottomSheet } = useAppLayout();
  const router = useRouter();
  const { drawerInfo } = useChatbotStore(state => ({
    drawerInfo: state.drawerInfo,
  }));

  return (
    <>
      <div className="flex flex-1 items-center">
        <div className="flex flex-row items-start flex-1 gap-4">
          {!infoBottomSheet.apply && (
            <div className={drawerInfo.show ? "" : "md:hidden"}>
              <Button
                variant="outline"
                spacing="none"
                onClick={toggleIsSidePanelOpen}
              >
                <AppIcon icon="mdi:menu"></AppIcon>
              </Button>
            </div>
          )}
          <div className="flex flex-row items-center gap-x-4">
            {back && (
              <AppIcon
                onClick={() => router.back()}
                icon="mdi:arrow-left"
                width={16}
                className="mr-1 cursor-pointer"
              />
            )}
            {title && (
              <AppTypo variant="headingM" className="text-nowrap">
                {title}
              </AppTypo>
            )}
            {roadmap && <SidebarRoadmap />}
            {workspace && <Workspace isHeader />}
            {customComponent}
          </div>
        </div>

        <div className="flex flex-1 gap-3 flex-row-reverse items-center">
          {profile && <HeaderProfile />}
          {upgrade && <UpgradeHeader />}
          {history && <HistorySheet {...history} />}
          {document && <DocumentSheet />}
        </div>
      </div>
      <UserPanel />
    </>
  );
}
