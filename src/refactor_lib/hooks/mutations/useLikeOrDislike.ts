import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import chatBotAPI from "@/refactor_lib/services/api/v1/ChatBotAPI";
import chatPdfAPI from "@/refactor_lib/services/api/v1/ChatPdfAPI";
import type { ChatBotAPIRequest } from "@/refactor_lib/types/api/v1/ChatBotAPI";

const useLikeOrDislike = (app_name: AppsType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chat_id, like }: ChatBotAPIRequest["likeOrDislike"]) =>
      app_name === "chat_pdf"
        ? chatPdfAPI.likeOrDislike({
            data: { chat_id, like },
          })
        : chatBotAPI.likeOrDislike({
            data: { chat_id, like },
          }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.chatBotAPI.useLikeOrDislike(),
      });
    },
  });
};

export default useLikeOrDislike;
