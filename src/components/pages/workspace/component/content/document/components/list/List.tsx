import React, { useContext, useEffect, useMemo, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import WorkspaceContext from "@/components/pages/workspace/context";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import WorkspaceEmpty from "../../../components/WorkspaceEmpty";
import WorkspaceDocumentsContext from "../../context";
import workspaceDocumentsModel from "../../model";
import WorkspaceDocuemntContainer from "./container/Container";
import DcumentListSkeleton from "./Skeleton";

function DocumentList() {
  // Access the current tab state from workspace documents context
  const {
    states: { tab },
  } = useContext(WorkspaceDocumentsContext);

  // Access the search state from workspace context
  const {
    states: { search },
  } = useContext(WorkspaceContext);

  // Local state for pagination
  const [states, setStates] = useState({
    page: 1,
    page_size: 40,
  });

  // Mutation hook to fetch workspace documents
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: workspaceAPI.getWorkspaceDocuments, // API function to fetch documents
    onError: err => {
      console.log(err); // Log errors
    },
  });

  // Function to fetch documents with current state
  const query = async () =>
    mutateAsync({
      appType: tab, // Current tab type
      page: states.page, // Current page
      page_size: states.page_size, // Page size
      search, // Search query
    });

  // Fetch documents when tab or search changes
  useEffect(() => {
    if (tab) void query();
  }, [tab, search]);

  // Find the current tab model based on the active tab
  const tabModel = useMemo(
    () => workspaceDocumentsModel.tabs.find(el => el.app_type === tab),
    [tab],
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-4">
      {isPending ? ( // Show skeleton loader while data is loading
        <DcumentListSkeleton />
      ) : data?.data.length ? ( // Render documents if data exists
        data.data.map((el, key) => (
          <WorkspaceDocuemntContainer
            key={key}
            refetch={query} // Pass refetch function to refresh data
            tabModel={tabModel} // Pass current tab model
            item={el} // Pass individual document data
          />
        ))
      ) : (
        // Show empty state if no documents are found
        <WorkspaceEmpty />
      )}
    </div>
  );
}

export default DocumentList;
