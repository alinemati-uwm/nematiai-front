import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import workspaceAPI from "@/refactor_lib/services/api/v1/WorkspaceAPI";

function useImageEditorPage() {
  const params = useSearchParams();
  const auth = params.get("auth");
  const image = params.get("image");
  const isDark = params.get("isDark");

  const query = useQuery({
    queryKey: QUERY_KEYS.workspaceAPI.workspaceAppMobile,
    queryFn: () =>
      workspaceAPI.getUserWorkspace(
        { headers: { Authorization: `Bearer ${auth}` } },
        false,
      ),
    select: data => data.data,
    retry: 1,
    retryDelay: 500,
  });

  return {
    auth,
    image,
    isDark,
    query,
  };
}

export default useImageEditorPage;
