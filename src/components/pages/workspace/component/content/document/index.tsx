import React from "react";

import DocumentList from "./components/list/List";
import DocumentTabs from "./components/Tabs";
import WorkspaceDocumentsContext from "./context";
import useHookWorkspaceDocuments from "./useHookWorkspaceDocuments";

function WorkspaceDocuments() {
  // Access state and methods from the custom hook for workspace documents
  const { states, updateState } = useHookWorkspaceDocuments();

  return (
    // Provide context for workspace documents to child components
    <WorkspaceDocumentsContext value={{ states, methods: { updateState } }}>
      <div className="flex flex-col gap-y-6">
        <DocumentTabs /> {/* Render tabs for document navigation */}
        <DocumentList /> {/* Render the list of documents */}
      </div>
    </WorkspaceDocumentsContext>
  );
}

export default WorkspaceDocuments;
