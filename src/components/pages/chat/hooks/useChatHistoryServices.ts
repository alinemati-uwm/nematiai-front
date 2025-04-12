import chatBotAPI from "@/refactor_lib/services/api/v1/ChatBotAPI";
import type { HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

export const useChatHistoryServices = () => {
  const deleteHistory = async (history: HistoryAPIResponse["answers"]) => {
    await chatBotAPI.deleteConversation({
      data: { history_uuid: history.uuid },
    });
    return;
  };

  const pin = async (history: HistoryAPIResponse["answers"]) => {
    await chatBotAPI.pinConversation({
      data: { history_uuid: history.uuid },
    });
    return;
  };

  return {
    get: chatBotAPI.conversationsofUser,
    pin,
    delete: deleteHistory,
  };
};
