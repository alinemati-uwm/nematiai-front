import React from "react";

import AppLayout from "@/components/layout/AppLayout";
import { SetSearchParamProvider } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import { useGetDictionary } from "@/hooks";
import useGetUserWorkspaces from "@/refactor_lib/hooks/queries/useGetUserWorkspaces";

import WorkspaceContent from "./component/content";
import WorkspaceHead from "./component/head";
import WorkspaceContext from "./context";
import useHookWorkspace from "./useHookWorkspace";

function PageWorkspace() {
  // Fetch dictionary data for the workspace title
  const {
    page: {
      workspace: { work_space },
    },
  } = useGetDictionary();

  // Manage workspace state and methods
  const { states, updateState } = useHookWorkspace();

  // Fetch user workspaces data
  const { data: workspaces = [] } = useGetUserWorkspaces();

  return (
    // Provide workspace context to all child components
    <WorkspaceContext value={{ states, methods: { updateState }, workspaces }}>
      <AppLayout>
        <AppLayout.side />
        <AppLayout.body>
          <AppLayout.header title={work_space} />{" "}
          {/* Set the workspace title in the header */}
          <AppLayout.main>
            <SetSearchParamProvider
              appName="app"
              appSearchParamValue="prompt_library"
            >
              <div className="flex flex-col gap-y-2">
                <WorkspaceHead /> {/* Render the workspace header */}
                <Separator /> {/* Add a visual separator */}
                <div className="w-full mt-2">
                  <WorkspaceContent /> {/* Render the workspace content */}
                </div>
              </div>
            </SetSearchParamProvider>
          </AppLayout.main>
        </AppLayout.body>
      </AppLayout>
    </WorkspaceContext>
  );
}

export default PageWorkspace;
