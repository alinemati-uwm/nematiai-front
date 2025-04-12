"use client";

import React, { useEffect, useRef, type FC } from "react";

import ChatArea from "@/components/pages/chat/components/ChatArea";
import ChatBody from "@/components/pages/chat/components/Chats";
import { ShortcutLinks, Title } from "@/components/pages/chat/components/index";
import LoadingChat from "@/components/pages/chat/components/LoadingChat";
import { useChatConversationState } from "@/components/pages/chat/hooks/useChatConversationState";
import RenderIf from "@/components/shared/RenderIf";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import useGetDetailsHistory from "@/refactor_lib/hooks/queries/useGetDetailsHistory";
import type { HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

interface IProps {
  flagBtnSend: boolean;
  showBtnNewConversation: boolean;
  afterGetDetails?: ({ data }: { data: HistoryAPIResponse["answers"] }) => void;
  stopGenerate: ({ abortFetch }: { abortFetch: boolean }) => void;
  handleGenerate: (text: string, files?: File[]) => void;
  handleRegenerate: ({ prevChatId }: { prevChatId: number }) => void;
}

const ChatContent: FC<IProps> = ({
  afterGetDetails,
  handleGenerate,
  handleRegenerate,
  stopGenerate,
  flagBtnSend,
  showBtnNewConversation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Retrieve conversation list and conversation ID from Zustand store.
  const conversations = useChatbotStore.use.conversations();
  const setDocumentName = useChatbotStore.use.setDocumentName();
  const documentName = useChatbotStore.use.documentName();
  const { queries } = useQueryParams();
  const { isLessThan } = useBreakpoint();
  const isFirstPage = !conversations || conversations?.length === 0;

  const {
    data: detailsHistory,
    refetch: getDetailsAfterLoad,
    isPending,
  } = useGetDetailsHistory({
    appName: "chat_bot",
    uuid: queries.chatId as string,
  });

  useEffect(() => {
    if (!isPending && detailsHistory && detailsHistory.title !== documentName) {
      setDocumentName(detailsHistory.title || "");
      if (typeof afterGetDetails === "function")
        afterGetDetails({ data: detailsHistory });
    }
  }, [detailsHistory, isPending]);

  const { conversationIsFetching } =
    useChatConversationState(getDetailsAfterLoad);

  return (
    <div className="max-h-apps-page flex h-full w-full overflow-hidden bg-holder-lighter p-0 ">
      <div className=" mx-auto h-full w-full items-center justify-center overflow-y-auto flex  flex-col  ">
        <div
          ref={containerRef}
          className={` ${isFirstPage ? "h-full md:h-0" : "h-full"} relative w-full flex flex-col items-center  scrollbar px-4 overflow-x-hidden overflow-y-scroll `}
        >
          <RenderIf isTrue={isLessThan("md") && isFirstPage}>
            <div className="h-full flex items-center justify-center gap-6 flex-col">
              <div className="  flex  w-full px-2 md:px-0 scrollbar overflow-y-auto mx-auto flex-col items-center justify-center gap-20 overflow-hidden">
                <Title />
              </div>
              <ShortcutLinks />
            </div>
          </RenderIf>

          <RenderIf isTrue={!isFirstPage && conversations.length !== 0}>
            <ChatBody
              containerRef={containerRef}
              generateConversation={handleGenerate}
              flagBtnSend={flagBtnSend}
              chats={conversations}
              handleRegenerate={handleRegenerate}
              app_name="chat_bot"
            />
          </RenderIf>
        </div>

        <RenderIf isTrue={conversationIsFetching}>
          <LoadingChat />
        </RenderIf>

        {/* Render ChatArea component */}
        <div className="z-10 px-4 flex flex-col gap-6 w-full items-center justify-center">
          <RenderIf isTrue={isFirstPage && !isLessThan("md")}>
            <div className="flex-1 px-4 h-[100%] flex w-full   md:px-0 scrollbar overflow-y-auto mx-auto flex-col items-center justify-center gap-20">
              <Title />
            </div>
          </RenderIf>

          <ChatArea
            showBtnNewConversation={showBtnNewConversation}
            flagBtnSend={flagBtnSend}
            generateConversation={handleGenerate}
            stopGenerate={stopGenerate}
          />
          {isFirstPage && !isLessThan("md") && <ShortcutLinks />}
        </div>
      </div>
    </div>
  );
};
export default ChatContent;
