import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

const useChangeHistoryToFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: historyAPI.addAnswerToFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.historyAPI.all,
      });
    },
  });
};

export default useChangeHistoryToFavorite;
