import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

/**
 * Renders an empty state for the workspace when no results are found.
 * Displays an icon and a message indicating the absence of data.
 */
function WorkspaceEmpty() {
  // Retrieve localized text for "No Results Found" using a dictionary hook
  const {
    page: {
      chat: { no_results_found },
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col text-center mt-20 items-center justify-center gap-y-2 w-full col-span-full">
      {/* Display a search-related icon to visually indicate an empty state */}
      <AppIcon
        icon="icon-park-twotone:search"
        width={52}
        className="text-muted-dark"
      />

      {/* Display a message indicating no results were found */}
      <AppTypo color="secondary">{no_results_found}</AppTypo>
    </div>
  );
}

export default WorkspaceEmpty;
