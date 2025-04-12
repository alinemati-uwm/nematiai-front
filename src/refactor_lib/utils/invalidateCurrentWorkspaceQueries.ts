import { type QueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants/queryKeys";

/**
 * @description invalidate current workspace queries but hold atom controlled queries
 * @param `queryClient` - react-query client
 */
const invalidateCurrentWorkspaceQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    predicate(query) {
      const isWorkspace = query.queryKey.includes(
        QUERY_KEYS.workspaceAPI.all[0],
      );
      const isHistory = query.queryKey.includes(...QUERY_KEYS.historyAPI.all);
      // don't invalidate workspace queries that use atom (include current key)
      const isCurrentIncluded = query.queryKey.includes("current");

      return (isWorkspace || isHistory) && !isCurrentIncluded;
    },
  });
};

export default invalidateCurrentWorkspaceQueries;
