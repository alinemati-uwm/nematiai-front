"use client";

import React, { useContext, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import WorkspaceContext from "../../../context";
import WorkspaceEmpty from "../components/WorkspaceEmpty";
import DcumentListSkeleton from "../document/components/list/Skeleton";
import WorkspaceAppsContainer from "./container";

/**
 * Renders a list of workspace applications.
 * Fetches and displays applications based on search criteria.
 * Handles loading state and displays a fallback message when no data is found.
 */
function WorkspaceApps() {
  // Local state to manage pagination
  const [states, setStates] = useState({
    page: 1, // Current page number
    page_size: 40, // Number of items per page
  });

  // Access search state from workspace context
  const {
    states: { search },
  } = useContext(WorkspaceContext);

  // Mutation function to fetch workspace applications
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: workspaceAPI.getWorkspaceApps, // API call to fetch apps
    onError: err => {
      console.log(err); // Log errors for debugging
    },
  });

  // Function to execute the query with search and pagination parameters
  const query = async () =>
    mutateAsync({ search, page: states.page, page_size: states.page_size });

  // Re-fetch data whenever the search term changes
  useEffect(() => {
    void query();
  }, [search]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-3">
      {/* Show loading skeleton while fetching data */}
      {isPending ? (
        <DcumentListSkeleton />
      ) : data?.data.length ? (
        /* Render workspace applications */
        data.data.map((el, key) => (
          <WorkspaceAppsContainer refetch={mutateAsync} item={el} key={key} />
        ))
      ) : (
        /* Show empty state when no applications are found */
        <WorkspaceEmpty />
      )}
    </div>
  );
}

export default WorkspaceApps;
