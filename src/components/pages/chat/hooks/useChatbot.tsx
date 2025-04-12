"use client";

// Indicates that this component is intended to be used on the client side.
import { useEffect, useRef, useState } from "react";

import ChatBody from "@/components/pages/chat/components/Chats";
import useAttachments from "@/components/ui/attachments/Attachments";
import { type FileType } from "@/components/ui/attachments/types";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import useHandleChatBotConversation from "@/hooks/useHandleChatBotConversation";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import useGetDetailsHistory from "@/refactor_lib/hooks/queries/useGetDetailsHistory";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";
import { useGetConversationChat } from "@/services/chat-bot";
import type { SCRPropsType } from "@/services/types";

import { ShortcutLinks, Title } from "../components";
import ChatArea from "../components/ChatArea";
import LoadingChat from "../components/LoadingChat";

export type typeActiveTypeFile = "doc" | "image" | "both";

export default function useChatbot({
  app_name,
  regenerate,
  firstPage = true,
  flagBtnSend = true,
  showBtnNewConversation = true,
  aftergetDetails,
}: SCRPropsType & {
  app_name: AppsType;
  pathStr: string;
  regenerate: boolean;
  fullwidth: boolean;
  firstPage: boolean;
  flagBtnSend: boolean;
  showBtnNewConversation: boolean;
  history: boolean;
  aftergetDetails?: ({ data }: { data: HistoryAPIResponse["answers"] }) => void;
}) {
  // Retrieve conversation list and conversation ID from Zustand store.
  const conversations = useChatbotStore.use.conversations();
  const conversationId = useChatbotStore.use.conversationUUID();
  const { selectedEngine: selectedEngineChat } = useEngineFeatures();

  // Functions to manage the conversation state in the Zustand store.
  const setConversation = useChatbotStore.use.setConversation();
  const setConversationUUID = useChatbotStore.use.setConversationUUID();
  const setDocumentName = useChatbotStore.use.setDocumentName();
  const documentName = useChatbotStore.use.documentName();
  const { setQueryByRouter, queries } = useQueryParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isfirstpage, setIsfirstpage] = useState<boolean>(true);
  const [ActiveTypeFile, setActiveTypeFile] =
    useState<typeActiveTypeFile>("both");

  const getAcceptFileList = ({
    type,
  }: {
    type: "doc" | "image" | "both";
  }): FileType[] => {
    switch (type) {
      case "doc": {
        return [".pdf"];
      }
      case "image": {
        return [".png", ".jpg", ".jpeg"];
      }
      case "both": {
        return [".png", ".jpg", ".jpeg", ".pdf"];
      }
    }
  };

  const { isLessThan } = useBreakpoint();

  // Fetch conversation data if conversationId is present in the URL.
  const {
    data: conversationChats,
    isError,
    isFetching: conversationIsFetching,
    refetch: fetchListChatOfSelectedConversation,
  } = useGetConversationChat(queries.chatId as string, app_name, {
    enabled: false,
  });

  // Custom hook for managing the chatbot conversation.
  const { stopGenerate, handleGenerate, handleRegenerate } =
    useHandleChatBotConversation({ app_name });

  const {
    data: detailsHistory,
    refetch: getDetailsAfterLoad,
    isPending,
  } = useGetDetailsHistory({
    appName: app_name,
    uuid: queries.chatId as string,
  });

  useEffect(() => {
    if (!isPending && detailsHistory && detailsHistory.title !== documentName) {
      setDocumentName(detailsHistory.title || "");
      if (typeof aftergetDetails === "function")
        aftergetDetails({ data: detailsHistory });
    }
  }, [detailsHistory, isPending]);

  useEffect(() => {
    setIsfirstpage(firstPage && (!conversations || conversations.length === 0));
  }, [firstPage, conversations]);

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

  const {
    content,
    showUpload,
    holderDropFile,
    ViewFiles,
    files,
    resetFile,
    error,
    addFile,
  } = useAttachments({
    accept: getAcceptFileList({ type: ActiveTypeFile }),
    maxSize: 5,
  });

  const title = (
    <div className="  flex  w-full px-2 md:px-0 scrollbar overflow-y-auto mx-auto flex-col items-center justify-center gap-20">
      <Title />
    </div>
  );
  const shortcut = <ShortcutLinks></ShortcutLinks>;
  return {
    addFile,
    stopGenerate,
    content: (
      <div className="max-h-apps-page flex h-full w-full overflow-hidden bg-holder-lighter p-0 ">
        <div className=" mx-auto h-full w-full items-center justify-center overflow-y-auto flex  flex-col  ">
          <div
            ref={containerRef}
            className={` ${isfirstpage ? "h-full md:h-0" : "h-full"} relative w-full flex flex-col items-center  scrollbar px-4 overflow-x-hidden overflow-y-scroll `}
          >
            {isLessThan("md") && isfirstpage ? (
              <div className="h-full flex items-center justify-center gap-6 flex-col">
                {title}
                {shortcut}
              </div>
            ) : null}
            {!isfirstpage && conversations.length !== 0 && (
              <ChatBody
                containerRef={containerRef}
                generateConversation={handleGenerate}
                flagBtnSend={flagBtnSend}
                regenerate={regenerate}
                chats={conversations}
                handleRegenerate={handleRegenerate}
                app_name={app_name}
              />
            )}
          </div>

          {/* Show loading dialog if fetching conversations */}
          {conversationIsFetching && <LoadingChat></LoadingChat>}

          {/* Render ChatArea component */}
          <div className="z-10 px-4 flex flex-col gap-6 w-full items-center justify-center">
            {isfirstpage && !isLessThan("md") && (
              <div className="flex-1 px-4 h-[100%] flex w-full   md:px-0 scrollbar overflow-y-auto mx-auto flex-col items-center justify-center gap-20">
                <Title />
              </div>
            )}
            <ChatArea
              setActiveTypeFile={setActiveTypeFile}
              showBtnNewConversation={showBtnNewConversation}
              flagBtnSend={flagBtnSend}
              propsAttachments={{
                showUpload,
                content,
                holderDropFile,
                ViewFiles,
                files,
                resetFile,
                error,
              }}
              generateConversation={handleGenerate}
              stopGenerate={stopGenerate}
            />
            {isfirstpage && !isLessThan("md") && <ShortcutLinks />}
          </div>
        </div>
      </div>
    ),
  };
}
