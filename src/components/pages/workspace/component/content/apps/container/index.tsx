import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { type WorkspaceAPIResponse } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

import AppsContainerContext from "./appsContainerContext";
import AppsContainerDots from "./dots";
import AppsContainerUse from "./Use";

type props = {
  item: WorkspaceAPIResponse["getWorkspaceApps"][0];
  refetch: any;
};

/**
 * WorkspaceAppsContainer component
 *
 * This component represents a single workspace application item within a list.
 * It provides context for managing the app data and offers UI elements for interaction.
 */
function WorkspaceAppsContainer({ item, refetch }: props) {
  return (
    // Provide context with app data and refetch function for child components
    <AppsContainerContext value={{ item, refetch }}>
      <div className="border rounded p-3 flex flex-row items-center gap-x-4 justify-between">
        {/* Left section: App icon and name */}
        <div className="flex flex-row w-3/5 items-center gap-x-2 truncate">
          {/* Display a default app icon */}
          <div className="bg-muted-light w-8 h-8 text-primary justify-center items-center flex rounded">
            <AppIcon icon="solar:bag-3-broken" width={24} />
          </div>
          {/* Display app topic name with truncation to prevent overflow */}
          <AppTypo className="truncate">{item.app.topic}</AppTypo>
        </div>

        {/* Right section: Additional app actions */}
        <div className="flex flex-row w-2/5 items-center justify-end gap-x-2 truncate">
          {/* Action button (e.g., open/use app) */}
          <AppsContainerUse />
          {/* More options menu (e.g., move, delete) */}
          <AppsContainerDots />
        </div>
      </div>
    </AppsContainerContext>
  );
}

export default WorkspaceAppsContainer;
