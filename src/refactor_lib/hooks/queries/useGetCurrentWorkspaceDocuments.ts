import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

import useCurrentWorkspaceIdValue from "../atoms/useCurrentWorkspaceIdValue";

const useGetCurrentWorkspaceDocuments = ({
  appType,
  page_size = 10,
  search,
}: {
  appType: AppsType;
  page_size: number;
  search: string;
}) => {
  const currentWorkspaceId = useCurrentWorkspaceIdValue();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.workspaceAPI.getCurrentWorkspaceDocuments(
      currentWorkspaceId!,
      appType,
      page_size,
      search,
    ),
    queryFn: ({ pageParam = 1 }) =>
      workspaceAPI.getWorkspaceDocuments({
        appType,
        page: pageParam,
        page_size,
        search,
      }),
    getNextPageParam: (lastPage, allPages) => {
      // Determine the next page number based on the length of the data
      if (lastPage.data.length < page_size) {
        return undefined; // No more pages to load
      } else {
        return allPages.length + 1; // Return the next page number
      }
    },
    select: data => {
      // Transform the data to only include the actual documents (or whatever data you need)
      return {
        pages: data.pages.map(page => page.data), // Extract only the 'data' property from each page
        pageParams: data.pageParams, // Retain the page parameters as they are
      };
    },
    initialPageParam: 1, // Set the initial page parameter
  });
};

export default useGetCurrentWorkspaceDocuments;
