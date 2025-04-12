import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

const useGetDetailsHistory = ({
  appName,
  uuid,
  version = "",
  enabled = false,
}: {
  appName: AppsType;
  uuid: string;
  version?: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.historyAPI.getDetailsHistory(appName, uuid, version),
    queryFn: async () => {
      if (uuid === "")
        return { data: { title: undefined } as HistoryAPIResponse["answers"] };
      return await historyAPI.getDetails({ appName, uuid });
    },
    select: data => data.data,
    enabled,
    staleTime: 0,
  });
};

export default useGetDetailsHistory;
