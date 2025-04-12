import React, { useEffect } from "react";

import { AssistMessageCard } from "@/components/pages/chat/components/AssistMessageCard";
import { UserMessageCard } from "@/components/pages/chat/components/UserMessageCard";
import { MinimalButton } from "@/components/shared";
import { type typeHandleRegenerate } from "@/hooks/useHandleChatBotConversation";
import { cn } from "@/lib/utils";
import { useChatbotStore } from "@/stores/zustand/chat";
import type { Conversation } from "@/stores/zustand/chat/types";

// Define the props for the ChatMessage component
interface Props {
  handleRegenerate: typeHandleRegenerate; // Function to handle message regeneration
  conversation: Conversation; // Conversation object containing the message details
  app_name: AppsType;
  index?: number;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
  total?: number;
  setTotal?: (val: number) => void;
  generateConversation: (val: string) => void;
  flagBtnSend: boolean;
  isFirstMessage?: boolean;
  prevChatId: number;
}

const ChatMessage = ({
  conversation,
  handleRegenerate,
  app_name,
  index = 0,
  setIndex,
  total = 0,
  setTotal,
  generateConversation,
  flagBtnSend,
  isFirstMessage = false,
  prevChatId = 0,
}: Props) => {
  // State to keep track of the index of the selected answer to show
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [countOfChild, setCountOfChild] = React.useState<number>(
    conversation.answer.length,
  );
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  // Zustand store functions to manage chat state
  const setLastChild = useChatbotStore.use.setLastChatId();

  const setRegeneratedMessageId = useChatbotStore.use.setRegeneratedMessageId();

  useEffect(() => {
    setCountOfChild(conversation.answer.length);
  }, [index, total, conversation.answer]);

  useEffect(() => {
    if (
      (conversation.role === "assistant" && conversation.answer.length === 0) ||
      !conversation.answer
    ) {
      // goDownByScroll();
      setLastChild(conversation.id);
    }
  }, [conversation.text]);

  // Handle switching to the next answer in the list
  const handleNextAnswer = () => {
    setIndex?.((index + 1 + total) % total);
  };

  // Handle switching to the previous answer in the list
  const handlePreviousAnswer = () => {
    setIndex?.((index - 1 + total) % total);
  };

  const onCreateNewMessage = () => {
    const increaseTotal = total + 1;
    setTotal?.(increaseTotal);
    setIndex?.(increaseTotal - 1);
  };

  const counter =
    total > 1 && !isEdit ? (
      <div className="flex gap-1 items-center ">
        <MinimalButton
          variant="ghost"
          icon="mdi:chevron-left"
          onClick={handlePreviousAnswer}
        />
        <span>{` ${index + 1} of ${total}`}</span>
        <MinimalButton
          variant="ghost"
          icon="mdi:chevron-right"
          onClick={handleNextAnswer}
        />
      </div>
    ) : null;

  const card =
    conversation.role === "user" ? (
      <UserMessageCard
        counter={counter}
        messageText={conversation.text ? conversation.text : ""}
        date={conversation.created_at}
        files={conversation.files || []}
        viewFiles={conversation.viewFiles}
        generateConversation={generateConversation}
        isFirstMessage={isFirstMessage}
        flagBtnSend={flagBtnSend}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        prevChatId={prevChatId}
        onCreateNewMessage={onCreateNewMessage}
      />
    ) : (
      <AssistMessageCard
        counter={counter}
        onClickOnRegenerate={onCreateNewMessage}
        app_name={app_name}
        messageText={conversation.text ? conversation.text : ""}
        isLastMessage={conversation.answer.length === 0}
        message={conversation}
        handleRegenerate={handleRegenerate}
        setRegeneratedMessageId={setRegeneratedMessageId}
        prevChatId={prevChatId}
        date={conversation.created_at ? conversation.created_at : null}
      />
    );

  const isLastAssistantResponse =
    conversation.role === "assistant" && conversation.answer.length === 0;
  const isNewMessage =
    conversation.role === "user" &&
    !conversation.answer.some(a => a?.answer?.length > 0);

  return (
    <>
      <div
        key={selectedIndex}
        className={cn(
          isNewMessage && "last-user-message",
          isLastAssistantResponse && "last-assist-message",
        )}
      >
        {card}
      </div>

      {conversation.answer && conversation.answer.length > 0 && (
        <ChatMessage
          prevChatId={conversation.id}
          generateConversation={generateConversation}
          flagBtnSend={flagBtnSend}
          key={
            conversation.id +
            (conversation.created_at ? conversation.created_at : "") +
            selectedIndex
          }
          conversation={
            conversation.answer[selectedIndex]
              ? conversation.answer[selectedIndex]
              : conversation.answer[selectedIndex - 1]
          }
          handleRegenerate={handleRegenerate}
          app_name={app_name}
          index={selectedIndex}
          setIndex={setSelectedIndex}
          total={countOfChild}
          setTotal={setCountOfChild}
        />
      )}
    </>
  );
};

export default ChatMessage;
