import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import chatBotAPI from "@/refactor_lib/services/api/v1/ChatBotAPI";

const useConversationsofUser = (
  conversation_uuid: string,
  { enabled = true } = {},
) => {
  return useQuery({
    queryKey: QUERY_KEYS.chatBotAPI.useConversationsofUser(conversation_uuid),
    queryFn: () => chatBotAPI.conversationsofUser(),
    select: data => {
      if (Array.isArray(data.data)) {
        return { conversations: [], pins: [] };
      }
      return data.data;
    },
    enabled,
  });
};

export default useConversationsofUser;
