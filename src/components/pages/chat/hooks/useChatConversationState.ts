import { useEffect } from "react";

import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useGetConversationChat } from "@/services/chat-bot";

export const useChatConversationState = (getDetailsAfterLoad: () => void) => {
  const { setQueryByRouter, queries } = useQueryParams();
  const conversationId = useChatbotStore.use.conversationUUID();

  // Functions to manage the conversation state in the Zustand store.
  const setConversation = useChatbotStore.use.setConversation();
  const setConversationUUID = useChatbotStore.use.setConversationUUID();

  // Fetch conversation data if conversationId is present in the URL.
  const {
    data: conversationChats,
    isError,
    isFetching: conversationIsFetching,
    refetch: fetchListChatOfSelectedConversation,
  } = useGetConversationChat(queries.chatId as string, "chat_bot", {
    enabled: false,
  });

  // Update the URL query when the conversationId changes.
  useEffect(() => {
    if (isError) {
      setQueryByRouter({}, ["chatId"]);
      setConversationUUID("");
    }
  }, [isError]);

  // Update the URL query when the conversationId changes.
  useEffect(() => {
    if (queries.chatId && conversationId !== queries.chatId) {
      fetchListChatOfSelectedConversation();
      getDetailsAfterLoad();
    }
  }, [queries.chatId]);

  // Fetch and set the conversation data when the chatId in the URL changes.
  useEffect(() => {
    if (conversationChats && queries.chatId) {
      if (conversationChats.length !== 0) {
        if (conversationChats[0].role === "assistant")
          setConversation(conversationChats[0].answer);
        else {
          setConversation(conversationChats as []);
        }
      } else {
        setConversation([]);
      }
      setConversationUUID(queries.chatId as string);
    }
  }, [conversationChats]);

  return { conversationIsFetching };
};
