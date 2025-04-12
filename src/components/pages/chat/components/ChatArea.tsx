"use client";

// Indicates that this component is intended to be used on the client side.
import { memo, useState } from "react";

import useMedia from "use-media";

import { getAcceptFileList } from "@/components/pages/chat/utils";
import { AppTooltip } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import useAttachments from "@/components/ui/attachments/Attachments";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useGetDictionary } from "@/hooks";

import { type typeActiveTypeFile } from "../hooks/useChatbot";
import { PromptInput } from "./PromptInput";

interface NewChatButtonProps {
  stopGenerate: ({ abortFetch }: { abortFetch: boolean }) => void;
}

// Button component to start a new chat.
export function NewChatButton({ stopGenerate }: NewChatButtonProps) {
  const resetConversation = useChatbotStore.use.resetConversation(); // Function to reset the conversation in the Zustand store.
  const conversations = useChatbotStore.use.conversations(); // Retrieve the current conversation ID.

  const {
    page: { chat: chatDictionary }, // Get chat dictionary values for localization.
  } = useGetDictionary();

  const { setQueryByRouter } = useQueryParams();

  return (
    <>
      {conversations.length !== 0 && (
        <AppTooltip title={chatDictionary.new_chat_button_label}>
          <Button
            variant="default"
            onClick={() => {
              stopGenerate({ abortFetch: true }); // Stop ongoing generation processes.
              resetConversation(); // Reset the conversation.
              setQueryByRouter({}, ["chatId"]);
            }}
          >
            <AppIcon fontSize={18} icon="mdi:plus" />
            <span className="hidden md:block">
              {chatDictionary.new_chat_button_label}
            </span>
          </Button>
        </AppTooltip>
      )}
    </>
  );
}

interface IProps {
  generateConversation: (val: string) => void;
  stopGenerate: ({ abortFetch }: { abortFetch: boolean }) => void;
  flagBtnSend: boolean;
  showBtnNewConversation: boolean;
}

// Main component for chat area.
export default memo(function ChatArea({
  generateConversation,
  stopGenerate,
  flagBtnSend,
  showBtnNewConversation,
}: IProps) {
  const isSmallScreen = useMedia({ maxWidth: "768px" }); // Check if the screen is small.

  const [activeTypeFile, setActiveTypeFile] =
    useState<typeActiveTypeFile>("both");

  const {
    content,
    showUpload,
    holderDropFile,
    ViewFiles,
    files,
    resetFile,
    error,
  } = useAttachments({
    accept: getAcceptFileList({ type: activeTypeFile }),
    maxSize: 5,
  });

  return (
    <div className="col mx-auto w-full max-w-[760px] gap-1.5 ">
      <div className="flex col w-full items-start gap-1">
        {/* Show new chat button and prompt input */}
        <div className="w-full flex items-start gap-1">
          {showBtnNewConversation && !isSmallScreen}{" "}
          {/* Show new chat button if not on a small screen */}
          <PromptInput
            setActiveTypeFile={setActiveTypeFile}
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
            stopGenerate={stopGenerate}
            generateConversation={generateConversation}
          />
        </div>
      </div>
    </div>
  );
});
