"use client";

import { useEffect } from "react";

import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import {
  useContinueConvChatBot,
  useRegenerateAnswer,
} from "@/services/chat-bot";

export type typeHandleRegenerate = (val: { prevChatId: number }) => void;

/**
 * Hook to handle chatbot conversation
 * @param app_name - The name of the app
 */
const useHandleChatBotConversation = ({
  app_name = "chat_bot",
}: {
  app_name?: AppsType;
}) => {
  //using chatBot store
  const addMessage = useChatbotStore.use.addMessage();
  const addRegeneratedMessage = useChatbotStore.use.addRegeneratedMessage();
  const lastChatId = useChatbotStore.use.lastChatId();
  const setIsStreaming = useChatbotStore.use.setIsStreaming();
  const conversationUUID = useChatbotStore.use.conversationUUID();
  const setConversationUUID = useChatbotStore.use.setConversationUUID();
  const setBeforeStart = useChatbotStore.use.setBeforeStart();
  const setDocumentName = useChatbotStore.use.setDocumentName();
  const setIsPendingForStop = useChatbotStore.use.setIsPendingForStop();
  const { setQueryByRouter } = useQueryParams();

  const setMessageOfUnsent = useChatbotStore.use.setMessageOfUnsent();

  // Zustand store functions to manage chat state

  //engine settings
  const { selectedEngineFeature, selectedEngine } = useEngineFeatures();

  //continue chat
  const {
    date: dateContinue,
    message: continueMessage,
    chats: continueChatsId,
    conversationId,
    documentName: documentNameAfterStart,
    modelIcon: modelIconContinueConversation,
    generateConversation: continueConversation,
    isPending: ContinueIsPending,
    setIsPendingForStop: setStopIsEnded,
    cancelStream: stopStreamContinueConvChatBot,
  } = useContinueConvChatBot({
    conversation_uuid: conversationUUID,
    chat_id: lastChatId,
    app_name,
    onPendingForStop: setIsPendingForStop,
    onBeforeStart: setBeforeStart,
    onUnsentMessage: data => {
      if (data.text !== "") setMessageOfUnsent(data);
    },
  });

  //regenerate chat
  const {
    date: dateRegenerate,
    message: regeneratedMessage,
    isSuccess: regenerateIsSuccess,
    chats: regenerateChatId,
    modelIcon: modelIconRegenerateConversation,
    generateConversation: regenerateConversation,
    cancelStream: stopStreamStopRegenerateConversation,
    isPending: regenerateIsPending,
  } = useRegenerateAnswer({
    conversation_uuid: conversationUUID,
    app_name,
    onPendingForStop: setIsPendingForStop,
    onUnsentMessage: data => {
      if (data.text !== "") setMessageOfUnsent(data);
    },
  });

  useEffect(() => {
    if (conversationId) {
      setConversationUUID(conversationId);
      setQueryByRouter({ chatId: conversationId });
    }
  }, [conversationId]);

  useEffect(() => {
    if (documentNameAfterStart !== "") {
      setDocumentName(documentNameAfterStart);
    }
  }, [documentNameAfterStart]);

  //set the isStreaming state for showing regenerate and other buttons after all generations are done
  useEffect(() => {
    if (regenerateIsPending || ContinueIsPending) {
      setIsStreaming(true);
    } else {
      setIsStreaming(false);
      setStopIsEnded(false);
      setIsPendingForStop(false);
    }
  }, [regenerateIsPending, ContinueIsPending]);

  //set the regenerated message
  useEffect(() => {
    regeneratedMessage &&
      addRegeneratedMessage({
        text: regeneratedMessage,
        chatId: regenerateChatId,
        date: dateRegenerate,
        modelIcon: modelIconRegenerateConversation,
      });
  }, [
    regeneratedMessage,
    regenerateIsSuccess,
    dateRegenerate,
    modelIconRegenerateConversation,
  ]);

  useEffect(() => {
    continueMessage &&
      addMessage({
        role: "assistant",
        text: continueMessage,
        chatId: continueChatsId,
        date: dateContinue,
        modelIcon: modelIconContinueConversation,
      });
  }, [
    continueMessage,
    continueChatsId,
    dateContinue,
    modelIconContinueConversation,
  ]);

  //function to generate stream for chat   test
  function handleGenerate(text: string, files?: File[]) {
    setMessageOfUnsent({ text: "", files: [] });
    continueConversation({
      files: files,
      generate_data: {
        message: text ? text : "",
        model: selectedEngine,
        setting: {
          frequency_penalty: selectedEngineFeature
            ? selectedEngineFeature.frequency
            : 0,
          presence_penalty: selectedEngineFeature
            ? selectedEngineFeature.presence
            : 0,
          temperature: selectedEngineFeature
            ? selectedEngineFeature.temperature
            : 0.1,
          top_p: selectedEngineFeature ? selectedEngineFeature.top : 0,
        },
      },
    });
  }

  //function to generate stream for chat
  function stopGenerate({ abortFetch = false }: { abortFetch: boolean }) {
    if (ContinueIsPending) {
      stopStreamContinueConvChatBot("", abortFetch);
      return;
    }

    if (regenerateIsPending) {
      stopStreamStopRegenerateConversation("regenerate_", abortFetch);
      return;
    }
  }

  //function to regenerate chat
  function handleRegenerate({ prevChatId }: { prevChatId: number }) {
    setMessageOfUnsent({ text: "", files: [] });

    regenerateConversation({
      prevChatId,
      generate_data: {
        model: selectedEngine,
        setting: {
          temperature: selectedEngineFeature
            ? selectedEngineFeature.temperature
            : 0.1,
          frequency_penalty: selectedEngineFeature
            ? selectedEngineFeature.frequency / 100
            : 0,
          presence_penalty: selectedEngineFeature
            ? selectedEngineFeature.presence
            : 0,
          top_p: selectedEngineFeature ? selectedEngineFeature.top : 0,
        },
      },
    });
  }

  return {
    stopGenerate,
    handleGenerate,
    handleRegenerate,
  };
};

export default useHandleChatBotConversation;
