import { type AxiosRequestConfig, type AxiosResponse } from "axios";

import {
  type ChatBotAPIRequest,
  type ChatBotAPIResponse,
} from "@/refactor_lib/types/api/v1/ChatBotAPI";

import { axiosClientV1, createFetchEventSourceClientV1 } from ".";

const chatBotAPI = {
  basePath: "/chat_bot",
  startConversation: createFetchEventSourceClientV1<
    ChatBotAPIRequest["startConversation"]
  >("/chat_bot/conversation/"),
  continueConversation: createFetchEventSourceClientV1<
    ChatBotAPIRequest["continueConversation"]
  >("/chat_bot/conversation/"),
  regenerateConversation: createFetchEventSourceClientV1<
    ChatBotAPIRequest["regenerateConversation"]
  >("/chat_bot/regenerate_conversation/"),
  getHistoryOfConversation: (
    conversationUUID: string,
    requestConfig: AxiosRequestConfig,
  ) =>
    axiosClientV1.get(`${chatBotAPI.basePath}/history_of_conversation/`, {
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
      `${chatBotAPI.basePath}/save_chat/`,
      data,
      requestConfig,
    ),
  getSavedChats: () =>
    axiosClientV1.get<ChatBotAPIResponse["getSavedChats"]>(
      `${chatBotAPI.basePath}/get_saved_chats/`,
    ),
  pinConversation: ({ data }: { data: ChatBotAPIRequest["pinConversation"] }) =>
    axiosClientV1.post<ChatBotAPIResponse["pinConversation"]>(
      `${chatBotAPI.basePath}/pins/?history_uuid=${data.history_uuid}`,
    ),
  favConversation: ({ data }: { data: ChatBotAPIRequest["favConversation"] }) =>
    axiosClientV1.post<ChatBotAPIResponse["favConversation"]>(
      `${chatBotAPI.basePath}/favorites/`,
      data,
    ),
  deleteConversation: ({
    data,
  }: {
    data: ChatBotAPIRequest["deleteConversation"];
  }) =>
    axiosClientV1.delete(
      `${chatBotAPI.basePath}/delete_conversation/?history_uuid=${data.history_uuid}`,
    ),
  likeOrDislike: ({
    data,
  }: {
    data: ChatBotAPIRequest["likeOrDislike"];
  }): Promise<
    AxiosResponse<{
      success: boolean;
      message: string;
    }>
  > => axiosClientV1.post(`${chatBotAPI.basePath}/likes/`, data),
  conversationsofUser: () =>
    axiosClientV1.get<ChatBotAPIResponse["conversationsofUser"]>(
      "/chat_bot/conversations_of_user",
    ),
};

export default chatBotAPI;
