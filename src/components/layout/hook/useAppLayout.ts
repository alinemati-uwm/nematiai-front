"use client";

import { useUiStore } from "@/stores/zustand/ui-store";

export default function useAppLayout() {
  const {
    isSidePanelOpen,
    setIsSidePanelOpen,
    infoBottomSheet,
    setInfoBottomSheet,
  } = useUiStore(state => ({
    isSidePanelOpen: state.isSidePanelOpen,
    setIsSidePanelOpen: state.setIsSidePanelOpen,
    infoBottomSheet: state.infoBottomSheet,
    setInfoBottomSheet: state.setInfoBottomSheet,
  }));
  const toggleOpen = (open?: boolean) => {
    setInfoBottomSheet({
      active: true,
      open: open !== undefined ? open : !infoBottomSheet.open,
    });
  };

  const toggleActive = (active: boolean) => {
    setInfoBottomSheet({ active });
  };

  return {
    toggleActive,
    toggleOpen,
    infoBottomSheet,
    setInfoBottomSheet,
    setIsSidePanelOpen,
    isSidePanelOpen,
  };
}
