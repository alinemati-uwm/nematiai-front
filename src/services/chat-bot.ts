"use client";

import { useCallback } from "react";

import { useQuery } from "@tanstack/react-query";

import type { Conversation } from "@/stores/zustand/chat/types";
import { type StreamDynamicTypeAPI } from "@/refactor_lib/types/api/v1/StreamDynamicAPI";
import axiosClient from "@/services/axios-client";
import useStream, { type UnsentMessageType } from "@/services/useStreamingApi";

type typeDynamicQueryParams = { dynamicQueryParams?: string };

interface UseContinueConvChatBotProps {
  conversation_uuid: string;
  chat_id: number;
  app_name: AppsType;
  onMessage?: (data: any) => void;
  preventDefaultSetResponse?: boolean;
  onBeforeStart?: (val: boolean) => void;
  onPendingForStop?: (val: boolean) => void;
  onUnsentMessage?: (data: UnsentMessageType) => void;
  onSuccess?: () => void;
}

export function useContinueConvChatBot({
  conversation_uuid,
  chat_id,
  app_name,
  onBeforeStart,
  onMessage,
  preventDefaultSetResponse,
  onPendingForStop,
  onUnsentMessage,
  onSuccess,
}: UseContinueConvChatBotProps) {
  const { generateStream, ...other } = useStream<typeDynamicQueryParams>({
    appType: app_name as AppsType,
    endpoint: `/${app_name}/conversation/?${conversation_uuid && `conversation_uuid=${conversation_uuid}`}${chat_id && chat_id !== -2 ? `&chat_id=${chat_id}` : ""}`,
    invalidationQuery: { queryKey: ["historyChatBot"] },
    onBeforeStart,
    preventDefaultSetResponse,
    onMessage,
    onPendingForStop,
    onUnsentMessage,
    onSuccess,
  });

  const generateConversation = (body: {
    files?: File[];
    generate_data: StreamDynamicTypeAPI;
  }) => {
    return generateStream(body);
  };

  return {
    generateConversation,
    ...other,
  };
}

interface UseRegenerateAnswerProps {
  conversation_uuid: string;
  app_name: string;
  onMessage?: (data: any) => void;
  preventDefaultSetResponse?: boolean;
  onBeforeStart?: (val: boolean) => void;
  onPendingForStop?: (val: boolean) => void;
  onUnsentMessage?: (data: UnsentMessageType) => void;
  onSuccess?: () => void;
}

export function useRegenerateAnswer({
  conversation_uuid,
  app_name,
  onBeforeStart,
  onMessage,
  preventDefaultSetResponse,
  onPendingForStop,
  onUnsentMessage,
  onSuccess,
}: UseRegenerateAnswerProps) {
  const { generateStream, ...other } = useStream({
    appType: app_name as AppsType,
    endpoint: `/${app_name}/regenerate_conversation/?conversation_uuid=${conversation_uuid}`,
    invalidationQuery: { queryKey: ["historyChatBot"] },
    onMessage,
    preventDefaultSetResponse,
    onBeforeStart,
    onPendingForStop,
    onUnsentMessage,
    onSuccess,
  });

  const generateConversation = useCallback(
    ({
      generate_data,
      prevChatId,
    }: {
      generate_data: StreamDynamicTypeAPI;
      prevChatId: number;
    }) => {
      return generateStream({
        generate_data,
        dynamicQueryParams: `&chat_id=${prevChatId}`,
      });
    },
    [generateStream],
  );

  return {
    generateConversation,
    ...other,
  };
}

//get chats of a conversation

interface GetChatConversationResponse {
  id: number;
  role: "assistant";
  text: "you are a helpful assistant.";
  answer: Conversation[];
}

export function useGetConversationChat(
  conversation_uuid: string,
  app_name: string,
  { enabled = true } = {},
) {
  const { data, ...other } = useQuery({
    queryKey: ["conv", conversation_uuid],
    async queryFn() {
      if (!conversation_uuid) {
        // Return a default value if conversation_uuid is empty
        return null;
      }
      const { data } = await axiosClient.get<GetChatConversationResponse[]>(
        `/${app_name}/history_of_conversation/?conversation_uuid=${conversation_uuid}`,
      );

      return data;
    },
    enabled,
    retry: 0,
    staleTime: 0,
  });

  return { data, ...other };
}
