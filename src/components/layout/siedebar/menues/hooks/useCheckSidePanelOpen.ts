import { useUiStore } from "@/stores/zustand/ui-store";

/**
 * This is a custom React Hook that checks if the side panel is open.
 * It uses the Zustand state management library to get the state of the side panel.
 * It checks two conditions: if the side panel is open, and if the mouse is hovering over the side panel.
 * If either condition is true, the side panel is considered open.
 * However, the side panel will not open on mobile size.
 *
 * @returns {boolean} The state of the side panel. Returns true if the side panel is open or if the mouse is hovering over the side panel.
 * @hook
 * @example
 * const isSidePanelOpen = useCheckSidePanelOpen();
 */
function useCheckSidePanelOpen() {
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();
  //don't open side panel on mobile size
  return isSidePanelOpen;
}
export default useCheckSidePanelOpen;
