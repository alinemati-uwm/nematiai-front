"use client";

import React from "react";

import ChatMessage from "@/components/pages/chat/components/ChatMessages";
import { useChatbotScroll } from "@/components/pages/chat/hooks/useChatbotScroll";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import { type typeHandleRegenerate } from "@/hooks/useHandleChatBotConversation";
import { useChatbotStore } from "@/stores/zustand/chat";
import type { Conversation } from "@/stores/zustand/chat/types";

import { BtnGenerateForunsendError } from "./BtnGenerateForunsendError";

interface Props {
  handleRegenerate: typeHandleRegenerate;
  chats: Conversation[];
  app_name: AppsType;
  generateConversation: (val: string) => void;
  flagBtnSend: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ChatBody = ({
  chats,
  containerRef,
  handleRegenerate,
  app_name,
  generateConversation,
  flagBtnSend,
}: Props) => {
  const messageOfUnsent = useChatbotStore.use.messageOfUnsent();
  const { showScrollBtn, scrollToBottom } = useChatbotScroll({
    chats,
    containerRef,
  });

  return (
    <>
      <div className="py-4 w-full h-auto  flex flex-col gap-6 max-w-[100%] lg:max-w-[760px]  md:mx-auto ">
        <ChatMessage
          prevChatId={0}
          isFirstMessage={true}
          key={chats[0].id}
          conversation={chats[0]}
          handleRegenerate={handleRegenerate}
          app_name={app_name}
          generateConversation={generateConversation}
          flagBtnSend={flagBtnSend}
        />
        {messageOfUnsent.text !== "" && (
          <BtnGenerateForunsendError
            generateConversation={generateConversation}
          />
        )}
        <div
          className=" w-full height-adjustment -mt-6"
          style={{ height: "0px" }}
        />
      </div>
      <RenderIf isTrue={showScrollBtn}>
        <div className="fixed bottom-[150px]  flex justify-center">
          <div
            onClick={scrollToBottom}
            className="bg-holder-lighter shadow-lg rounded-full border cursor-pointer inset-shadow-sm p-1"
          >
            <AppIcon icon="material-symbols:arrow-downward-alt" fontSize={24} />
          </div>
        </div>
      </RenderIf>
    </>
  );
};

export default ChatBody;
