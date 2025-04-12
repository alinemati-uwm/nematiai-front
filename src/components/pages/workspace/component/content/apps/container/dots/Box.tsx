import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

interface props {
  icon?: string;
  caption: string;
  onClick?(): void;
}

/**
 * AppsContainerDotsBox Component
 *
 * A reusable component that renders an interactive button with an icon and a caption.
 * It is commonly used for actions like moving or deleting apps within the workspace.
 */
function AppsContainerDotsBox({ caption, icon, onClick }: props) {
  return (
    <div
      className="flex flex-row items-center gap-x-1 cursor-pointer hover:bg-muted-dark px-3 py-2"
      onClick={onClick}
    >
      {/* Render icon if provided */}
      {icon && <AppIcon icon={icon} />}

      {/* Render caption text */}
      <AppTypo variant="small">{caption}</AppTypo>
    </div>
  );
}

export default AppsContainerDotsBox;
