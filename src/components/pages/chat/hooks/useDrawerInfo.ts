"use client";

import { useEffect } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useChatbotStore } from "@/stores/zustand/chat";
import type { ChatDrawer } from "@/stores/zustand/chat/types";
import { useUiStore } from "@/stores/zustand/ui-store";

export const useDrawerInfo = () => {
  const { drawerInfo, setDrawerInfo } = useChatbotStore(state => ({
    drawerInfo: state.drawerInfo,
    setDrawerInfo: state.setDrawerInfo,
  }));

  const { isGreaterThan } = useBreakpoint();

  const { setIsSidePanelOpen } = useUiStore(state => ({
    setIsSidePanelOpen: state.setIsSidePanelOpen,
  }));

  const close = () => {
    if (isGreaterThan("md")) setIsSidePanelOpen(true);
    setDrawerInfo({ show: false });
  };

  const show = ({ active, editor }: Omit<ChatDrawer, "show">) => {
    setIsSidePanelOpen(false);
    setDrawerInfo({
      show: true,
      active: active,
      editor,
    });
  };

  const setActiveMenu = ({ active, editor }: Omit<ChatDrawer, "show">) => {
    setDrawerInfo({
      show: false,
      active: active,
      editor,
    });
  };

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  return {
    drawerInfo,
    setDrawerInfo,
    close,
    show,
    setActiveMenu,
  };
};
