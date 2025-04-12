"use client";

import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import useGetUserWorkspaces from "@/refactor_lib/hooks/queries/useGetUserWorkspaces";

import { WorkspaceItems } from "./workspaceItems";

// export interface TransformedWorkspace {
//   id: string;
//   label: string;
//   value: string;
//   default: boolean;
// }

// function transformWorkspaces(
//   workspaces: WorkspaceAPIResponse["getUserWorkspace"],
// ): TransformedWorkspace[] {
//   return workspaces.map(workspace => ({
//     id: workspace.workspace.id.toString(),
//     label: workspace.workspace.name,
//     value: workspace.workspace.name,
//     default: workspace.is_default,
//   }));
// }

/**
 * workspace select rendered in side panel if is open else rendered in header
 * @param isHeader for change size and hide it if side panel open
 * @constructor
 */
export function Workspace({ isHeader = false }: { isHeader?: boolean }) {
  const {
    data: workspaces,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserWorkspaces();

  if (isLoading || isFetching) {
    return <Skeleton className="w-full h-input" />;
  }

  if (isSuccess) {
    return <WorkspaceItems isHeader={isHeader} workspaces={workspaces ?? []} />;
  } else {
    return <div>No Workspace found.</div>;
  }
}
