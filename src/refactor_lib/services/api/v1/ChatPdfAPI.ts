import { type AxiosRequestConfig, type AxiosResponse } from "axios";

import {
  type ChatBotAPIRequest,
  type ChatBotAPIResponse,
} from "@/refactor_lib/types/api/v1/ChatBotAPI";

import { axiosClientV1, createFetchEventSourceClientV1 } from ".";

const chatPdfAPI = {
  basePath: "/chat_pdf",
  startConversation: createFetchEventSourceClientV1<
    ChatBotAPIRequest["startConversation"]
  >({ endpoint: "/chat_bot/conversation/" }),
  continueConversation: createFetchEventSourceClientV1<
    ChatBotAPIRequest["continueConversation"]
  >({ endpoint: "/chat_bot/conversation/" }),
  regenerateConversation: createFetchEventSourceClientV1<
    ChatBotAPIRequest["regenerateConversation"]
  >({ endpoint: "/chat_bot/regenerate_conversation/" }),
  getHistoryOfConversation: (
    conversationUUID: string,
    requestConfig: AxiosRequestConfig,
  ) =>
    axiosClientV1.get(`${chatPdfAPI.basePath}/history_of_conversation/`, {
      params: {
        conversation_uuid: conversationUUID,
      },
      ...requestConfig,
    }),
  saveChat: (
    data: ChatBotAPIRequest["saveChat"],
    requestConfig: AxiosRequestConfig,
  ) =>
    axiosClientV1.post(
      `${chatPdfAPI.basePath}/save_chat/`,
      data,
      requestConfig,
    ),
  getSavedChats: () =>
    axiosClientV1.get<ChatBotAPIResponse["getSavedChats"]>(
      `${chatPdfAPI.basePath}/get_saved_chats/`,
    ),
  pinConversation: ({ data }: { data: ChatBotAPIRequest["pinConversation"] }) =>
    axiosClientV1.post<ChatBotAPIResponse["pinConversation"]>(
      `${chatPdfAPI.basePath}/pins/`,
      data,
    ),
  favConversation: ({ data }: { data: ChatBotAPIRequest["favConversation"] }) =>
    axiosClientV1.post<ChatBotAPIResponse["favConversation"]>(
      `${chatPdfAPI.basePath}/favorites/`,
      data,
    ),
  deleteConversation: ({
    data,
  }: {
    data: ChatBotAPIRequest["deleteConversation"];
  }) =>
    axiosClientV1.delete(`${chatPdfAPI.basePath}/delete_conversation`, {
      data: data,
    }),
  likeOrDislike: ({
    data,
  }: {
    data: ChatBotAPIRequest["likeOrDislike"];
  }): Promise<
    AxiosResponse<{
      success: boolean;
      message: string;
    }>
  > => axiosClientV1.post(`${chatPdfAPI.basePath}/likes/`, data),
  conversationsofUser: () =>
    axiosClientV1.get<ChatBotAPIResponse["conversationsofUser"]>(
      "/chat_bot/conversations_of_user",
    ),
};

export default chatPdfAPI;
