"use client";

import { useRef } from "react";

import { Sidebar } from "react-pro-sidebar";

import useBreakpoint from "@/hooks/useBreakpoint";
import { getHslColorByVar } from "@/lib/utils";
import { dirInLocalStorage } from "@/stores/browser-storage";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useUiStore } from "@/stores/zustand/ui-store";

import { Workspace } from "../../workspace";
import SidePanelHeader from "./SidePanelHeader";
import SidePanelMenu from "./SidePanelMenu";

export function SidePanelMenues() {
  const { isSidePanelOpen, setIsSidePanelOpen } = useUiStore(state => ({
    isSidePanelOpen: state.isSidePanelOpen,
    setIsSidePanelOpen: state.setIsSidePanelOpen,
  }));

  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const isLtr = dir === "ltr";
  const sidebarRef = useRef(null);
  const { drawerInfo } = useChatbotStore(state => ({
    drawerInfo: state.drawerInfo,
    setDrawerInfo: state.setDrawerInfo,
  }));

  const { isLessThan } = useBreakpoint();

  return (
    <>
      <div
        onClick={() => {
          setIsSidePanelOpen(false);
        }}
        className={
          isSidePanelOpen
            ? `w-screen h-screen absolute blur-overlay z-[39]  ${drawerInfo.show ? "" : "md:hidden"} `
            : ""
        }
      />
      <Sidebar
        ref={sidebarRef}
        collapsed={!isSidePanelOpen}
        collapsedWidth={
          isLessThan("md") || drawerInfo.show
            ? "0"
            : "var(--side-width-collapse)"
        }
        width="var(--side-width)"
        transitionDuration={500}
        className="w-[0px]"
        backgroundColor={getHslColorByVar("--bg-light")}
        rootStyles={{
          overflow: "hidden",
          borderRightWidth: isLtr ? "1px" : 0,
          borderLeftWidth: isLtr ? 0 : "1px",
          position:
            isLessThan("md") || !isSidePanelOpen || drawerInfo.show
              ? "fixed"
              : "sticky",
          borderColor: getHslColorByVar("--bg-dark"),
          top: 0,
          bottom: 0,
          zIndex: 40,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SidePanelHeader setIsSidePanelOpen={setIsSidePanelOpen} />
        <div className="px-2 mt-5 mb-1">
          <Workspace isHeader={false} />
        </div>
        <SidePanelMenu isOpen={isSidePanelOpen} />
      </Sidebar>
    </>
  );
}
