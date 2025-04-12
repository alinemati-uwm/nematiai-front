import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import axiosClient from "@/services/axios-client";

type HistoryVUpdateParams = {
  answerUuid: string;
  answer_text: string;
};

export function useHistoryUpdateChild({ appName }: { appName: AppsType }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ answerUuid, answer_text }: HistoryVUpdateParams) => {
      const { data } = await axiosClient.put<Answer>(
        "/histories/update_history/?history_uuid=" + answerUuid,
        {
          answer_text,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.historyAPI.getHistories(appName),
      }); // Invalidate the query to trigger a refetch
    },
  });
}
