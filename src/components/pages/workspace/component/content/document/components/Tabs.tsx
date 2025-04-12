import React, { useContext } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";

import WorkspaceDocumentsContext from "../context";
import workspaceDocumentsModel from "../model";

function DocumentTabs() {
  // Access tabs data from the workspace documents model
  const { tabs } = workspaceDocumentsModel;

  // Access the current tab state and update method from context
  const {
    states: { tab },
    methods: { updateState },
  } = useContext(WorkspaceDocumentsContext);

  return (
    <nav className=" row p-1 gap-1 bg-muted border-[0.5px] rounded-2xl mx-auto">
      {tabs.map(item => {
        const isActive = item.app_type === tab;

        return (
          <div
            key={`workspace-tab-${item.app_type}`}
            className={cn(
              "row justify-center w-full py-1 px-4 gap-1 cursor-pointer  rounded-xl transition-all duration-200",
              isActive && "bg-holder-lighter",
            )}
            onClick={() => updateState("tab", item.app_type)} // Update tab state on click
          >
            <AppTypo
              className={cn("text-nowrap", isActive && "text-label-darker")}
            >
              {item.name}
            </AppTypo>
          </div>
        );
      })}
    </nav>
  );
}

export default DocumentTabs;
