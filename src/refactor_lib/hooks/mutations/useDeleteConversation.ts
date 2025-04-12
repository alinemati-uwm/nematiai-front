import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import chatBotAPI from "@/refactor_lib/services/api/v1/ChatBotAPI";
import type { ChatBotAPIRequest } from "@/refactor_lib/types/api/v1/ChatBotAPI";

const useDeleteConversation = (conversation_uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversation_uuid,
    }: ChatBotAPIRequest["deleteConversation"]) =>
      chatBotAPI.deleteConversation({
        data: { conversation_uuid },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.chatBotAPI.useConversationsofUser(conversation_uuid),
      });
    },
  });
};

export default useDeleteConversation;
