"use client";

import { MinimalButton } from "@/components/shared";
import { useUiStore } from "@/stores/zustand/ui-store";

//used in header for open side  and close panel

export function ToggleSidePanelButton() {
  const toggleIsSidePanelOpen = useUiStore.use.toggleIsSidePanelOpen(); //side panel toggle open state handler
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();

  return (
    <MinimalButton
      onClick={toggleIsSidePanelOpen}
      className="aspect-square"
      icon={isSidePanelOpen ? "mdi:arrow-left" : "ion:arrow-forward-sharp"}
    />
  );
}
