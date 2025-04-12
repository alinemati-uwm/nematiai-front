import { useEffect, useState } from "react";

import type { AIAction } from "@/components/editor/editor-custom/types";
import useStream, { type StreamParams } from "@/services/useStreamingApi";

export interface AskInput {
  message: string;
  prompt_context?: Record<string, string>;
  prompt_type?: string;
  model: string;
}

const setting = {
  frequency_penalty: 0,
  presence_penalty: 0,
  temperature: 0.2,
  top_p: 1,
};

const useAskQuestion = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [conversationUUID, setConversationUUID] = useState("");
  const [answersList, setAnswersList] = useState<string[]>([]);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [lastChatId, setLastChatId] = useState(-1);

  const reset = () => {
    setResponseMessage("");
    setAnswersList([]);
    setSuccessful(false);
    setCurrentAnswerIndex(0);
    setConversationUUID("");
  };

  useEffect(() => {
    return () => reset();
  }, []);

  useEffect(() => {
    if (successful) {
      if (responseMessage && responseMessage.length > 0) {
        setAnswersList(prev => [...prev, responseMessage]);
        setCurrentAnswerIndex(answersList.length);
        setResponseMessage("");
      }
      setSuccessful(false);
    }
  }, [successful]);

  const getCommonProps = (isRegenerate: boolean = false) => {
    return {
      appType: "chat_bot",
      onBeforeStart: () => {},
      onPendingForStop: () => {},
      onUnsentMessage: () => {},
      preventDefaultSetResponse: true,
      invalidationQuery: { queryKey: ["historyChatBot"] },
      onMessage: (data: any) => {
        const { content, conversation_uuid } = data;
        if (content) setResponseMessage(prev => prev + content);
        if (!isRegenerate) {
          if (conversation_uuid) setConversationUUID(conversation_uuid);
          if (data.chats && data.chats.length > 0)
            setLastChatId(data.chats[data.chats.length - 1]);
        }
      },
      onSuccess: () => setSuccessful(true),
    } as Omit<StreamParams, "endpoint">;
  };

  const {
    generateStream,
    isPending: isGenerating,
    cancelStream: stopGenerate,
  } = useStream({
    endpoint: "/chat_bot/conversation/",
    ...getCommonProps(),
  });

  const {
    generateStream: regenerate,
    isPending: isRegenerating,
    cancelStream: stopRegenerate,
  } = useStream({
    endpoint: `/chat_bot/regenerate_conversation/?conversation_uuid=${conversationUUID}&chat_id=${lastChatId}`,
    ...getCommonProps(true),
  });

  const askQuestion = ({
    message,
    model,
    prompt_context,
    prompt_type,
  }: AskInput) => {
    generateStream({
      files: [],
      generate_data: {
        message,
        model,
        prompt_context: prompt_context || {},
        prompt_type,
        setting,
      },
    });
  };

  const generateAction = (action: AIAction, model: string, message: string) => {
    askQuestion({
      message,
      model,
      prompt_type: action.promptType,
      prompt_context:
        action.options.length > 0
          ? {
              [action.optionKey || "option"]:
                action.selectedOption || action.options[0],
            }
          : {},
    });
  };

  const handleRegenerate = (model: string) => {
    regenerate({
      generate_data: {
        model,
        setting,
      },
    });
  };

  const stopGeneration = async () => {
    if (isRegenerating) {
      await stopRegenerate("regenerate_", false);
    } else {
      await stopGenerate("", false);
    }
  };

  return {
    isGenerating,
    askQuestion,
    generateAction,
    responseMessage,
    conversationUUID,
    handleRegenerate,
    isRegenerating,
    currentAnswerIndex,
    answersList,
    setCurrentAnswerIndex,
    isStreaming: isRegenerating || isGenerating,
    reset,
    stopGeneration,
  };
};

export default useAskQuestion;
