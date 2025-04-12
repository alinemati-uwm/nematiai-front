import { createContext } from "react";

import { type WorkspaceAPIResponse } from "@/refactor_lib/types/api/v1/WorkspaceAPI";

type context = {
  item: WorkspaceAPIResponse["getWorkspaceApps"][0];
  refetch: any;
};

const AppsContainerContext = createContext({} as context);

export default AppsContainerContext;
