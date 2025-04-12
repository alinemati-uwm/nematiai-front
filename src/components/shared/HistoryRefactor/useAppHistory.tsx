import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { type typeHeaderOfFirstLevel } from "@/components/layout/types";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

function useAppHistory(props: Partial<typeHeaderOfFirstLevel["history"]>) {
  const query = useQuery({
    queryKey: props?.type
      ? QUERY_KEYS.historyAPI.getHistories(props?.type)
      : QUERY_KEYS.historyAPI.all,
    queryFn: () =>
      props?.service?.get
        ? props.service.get()
        : historyAPI.getAllAnswers({ appName: props?.type }),
    select: res => res.data,
    enabled: !!props?.type,
  });
  const { data, setHistoryUpdateData } = useHistoryStore();

  // Update data history store
  useEffect(() => {
    if (query.data) setHistoryUpdateData(query.data);
  }, [query.data]);

  // ******** Return
  return {
    query,
    data,
  };
}

export default useAppHistory;
