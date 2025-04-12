"use client";

import React, { useEffect, useRef, useState } from "react";

import { MinimalButton } from "@/components/shared";
import useAttachments from "@/components/ui/attachments/Attachments";
import { Button } from "@/components/ui/button";
import EditableDiv from "@/components/ui/InputDiv";
import { useSpeechToText } from "@/components/ui/useSpeechToText";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useGetDictionary } from "@/hooks";

/** *
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */

export default function PromptEdit({
  generateConversation,
  flagBtnSend,
  prevChatId = 0,
  text,
  setIsEdit,
  ongenerate,
}: {
  generateConversation: (val: string, files: File[]) => void;
  flagBtnSend: boolean;
  prevChatId: number;
  text: string;
  setIsEdit: (val: boolean) => void;
  ongenerate: () => void;
}) {
  const editableDivRef = useRef<HTMLDivElement>(null);
  const [speech, setSpeech] = useState("");

  const propsAttachments = useAttachments({
    accept: [".png", ".jpg", ".jpeg", ".pdf"],
    maxSize: 5,
  });

  const { content: btnSpeech } = useSpeechToText({
    transcript: speech,
    setTranscript: setSpeech,
  });
  //input text
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState<number>(0);
  const {
    page: { chat: chatDictionary },
    common,
  } = useGetDictionary();

  const addMessage = useChatbotStore.use.addMessage();
  const isStreaming = useChatbotStore.use.isStreaming();
  const conversationId = useChatbotStore.use.conversationUUID();
  const setLastChatId = useChatbotStore.use.setLastChatId();
  const lastChatId = useChatbotStore.use.lastChatId();
  const isEditMessageOfUser = useChatbotStore.use.isEditMessageOfUser();
  const setIsEditMessageOfUser = useChatbotStore.use.setIsEditMessageOfUser();

  const SendPrompt = async (inputText: string, files: File[]) => {
    if (isEditMessageOfUser) {
      return;
    }

    if (
      !(
        isStreaming ||
        inputText.trim() === "" ||
        propsAttachments.error ||
        !flagBtnSend
      )
    ) {
      setIsEditMessageOfUser(true);
      setLastChatId(prevChatId);

      setTimeout(() => {
        setIsEdit(false);
        setIsEditMessageOfUser(false);
        ongenerate();
        generateConversation(inputText, files);
        addMessage({
          role: "user",
          text: inputText,
          viewFiles: propsAttachments.ViewFiles,
        });
        setInputText("");
        propsAttachments.resetFile();
      }, 500);
    }
  };
  // handle cleaning the div by clicking the trash icon

  useEffect(() => {
    if (editableDivRef.current) {
      editableDivRef.current.innerHTML = text;
    }
    setInputText(text);
  }, [text]);

  const [openprompt, setOpenPrompt] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full h-full items-start gap-4">
        <div className="w-full pb-12  pl-4 pr-12 pt-3  relative flex flex-col items-end  border rounded bg-muted max-h-[200px] ">
          <div
            className={`w-full ${propsAttachments.files.length !== 0 && conversationId && "mb-1"} `}
          >
            {propsAttachments.content}
          </div>
          <EditableDiv
            className=" min-h-10 "
            key={key}
            divRef={editableDivRef}
            placeholder={chatDictionary.prompt_input_placeholder}
            getFromSpeech={speech}
            setSpeech={setSpeech}
            checkPlaceHolder={inputText}
            onChange={value => {
              setInputText(value);
            }}
            onKeydown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent default action if needed
                if (inputText.trim() !== "") {
                  SendPrompt(inputText, propsAttachments.files);
                }
              }
            }}
          ></EditableDiv>

          <div className="absolute w-[calc(100%-15px)] bottom-1 justify-between left-2 flex flex-row gap-2 ">
            <div className=" flex items-center">
              {btnSpeech}
              <MinimalButton
                icon="tabler:books"
                title="Library Prompt"
                onClick={() => {
                  setOpenPrompt(true);
                }}
                size="xs"
              />
              <MinimalButton
                onClick={propsAttachments.showUpload}
                icon="ic:outline-upload-file"
                title="upload File"
                size="xs"
              />
            </div>
            <div className="flex">
              <Button
                className="w-20 h-input bg-primary-lighter text-primary hover:text-white "
                onClick={() => {
                  setIsEdit(false);
                }}
                title={common.close}
              >
                {common.close}
              </Button>
              <Button
                title={common.send}
                onClick={() => {
                  if (!isStreaming && inputText.trim() !== "") {
                    SendPrompt(inputText, propsAttachments.files);
                  }
                }}
                className="w-20 h-input ml-3"
              >
                {common.send}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
