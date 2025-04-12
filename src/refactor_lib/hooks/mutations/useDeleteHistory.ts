import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import historyAPI from "@/refactor_lib/services/api/v1/HistoryAPI";

const useDeleteHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: historyAPI.deleteAnswerByUUID,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.historyAPI.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DocumentPersonalAPI.GetDocumentList(),
      });
    },
  });
};

export default useDeleteHistory;
