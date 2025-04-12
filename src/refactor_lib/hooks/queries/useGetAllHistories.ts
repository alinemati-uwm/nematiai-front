import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

const useGetAllHistories = (app_name: AppsType) => {
  return useQuery({
    queryKey: QUERY_KEYS.historyAPI.getHistories(app_name),
    queryFn: () => historyAPI.getAllAnswers({ appName: app_name }),
    select: data => data.data.histories,
  });
};

export default useGetAllHistories;
