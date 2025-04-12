import React, { useContext } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import WorkspaceContext from "../../context";
import type workspaceTypes from "../../type";

function WorkspaceTabs() {
  // Fetch dictionary data for tab captions
  const {
    page: {
      workspace: { apps_title },
    },
    components: {
      apps_header: { document },
    },
  } = useGetDictionary();

  // Access workspace context to get the current tab state and update method
  const {
    states: { tab },
    methods: { updateState },
  } = useContext(WorkspaceContext);

  // Define tab items with captions and types
  const items: { caption: string; type: workspaceTypes["states"]["tab"] }[] = [
    { caption: document, type: "document" },
    { caption: apps_title, type: "apps" },
  ];

  return (
    <div className="flex flex-row w-full">
      {items.map((el, key) => (
        <div
          key={key}
          className={`py-2 px-4 cursor-pointer ${tab === el.type ? "bg-primary-lighter" : ""} rounded`}
          onClick={() => updateState("tab", el.type)} // Update the active tab on click
        >
          <AppTypo
            variant={tab === el.type ? "headingXS" : "default"} // Change typography style for the active tab
            color={tab === el.type ? "primary" : "default"}
          >
            {el.caption}
          </AppTypo>
        </div>
      ))}
    </div>
  );
}

export default WorkspaceTabs;
