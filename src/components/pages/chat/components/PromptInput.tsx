"use client";

import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { MinimalButton } from "@/components/shared";
import AppModals from "@/components/shared/modals/AppModals";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import type { AttachmentsOutput } from "@/components/ui/attachments/types";
import { useSpeechToText } from "@/components/ui/useSpeechToText";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { useChatbotStore } from "@/stores/zustand/chat";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import type { TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import { type typeActiveTypeFile } from "../hooks/useChatbot";
import UploadFileChat from "./UploadFileChat";

type TemplateItem = TemplateAPIResponse["allTemplates"];

interface IProps {
  generateConversation: (val: string, files: File[]) => void;
  stopGenerate: ({ abortFetch }: { abortFetch: boolean }) => void;
  propsAttachments: AttachmentsOutput;
  flagBtnSend: boolean;
  setActiveTypeFile: React.Dispatch<React.SetStateAction<typeActiveTypeFile>>;
}

/**
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */
/**
 * Component for rendering a prompt input area with various functionalities such as speech-to-text,
 * file attachments, and sending prompts.
 *
 * @param props - The props for the component.
 * @param {Function} props.generateConversation - Function to generate a conversation with the given input text and files.
 * @param {Function} props.stopGenerate - Function to stop the generation of a conversation.
 * @param {AttachmentsOutput} props.propsAttachments - Object containing information about the attached files.
 * @param {boolean} props.flagBtnSend - Flag indicating whether the send button should be enabled.
 * @param {React.Dispatch<React.SetStateAction<typeActiveTypeFile>>} props.setActiveTypeFile - Function to set the active type of file.
 *
 * @returns JSX.Element The rendered component.
 */
export function PromptInput({
  generateConversation,
  stopGenerate,
  propsAttachments,
  flagBtnSend,
  setActiveTypeFile,
}: IProps) {
  //input text
  const [inputText, setInputText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<TemplateItem>();

  const { content: btnSpeech } = useSpeechToText({
    transcript: inputText,
    setTranscript: val => setInputText(prev => (prev ? prev + " " + val : val)),
    isChatbot: true,
  });

  useAutosizeTextArea(textAreaRef.current, inputText);

  const {
    page: { chat: chatDictionary },
    common,
  } = useGetDictionary();

  const addMessage = useChatbotStore.use.addMessage();
  const isStreaming = useChatbotStore.use.isStreaming();
  const isPendingForStop = useChatbotStore.use.isPendingForStop();
  const [_, setSearchParams] = useCustomSearchParams();

  const removeChatFromConversation =
    useChatbotStore.use.removeChatFromConversation();

  const sendPrompt = (inputText: string, files: File[]) => {
    if (
      !(
        isStreaming ||
        inputText.trim() === "" ||
        propsAttachments.error ||
        !flagBtnSend
      )
    ) {
      removeChatFromConversation();
      generateConversation(inputText, files);

      addMessage({
        role: "user",
        text: selectedPrompt
          ? `${selectedPrompt.prompt} ${inputText}`
          : inputText,
        viewFiles: propsAttachments.ViewFiles,
      });

      setInputText("");
      setSelectedPrompt(undefined);
      propsAttachments.resetFile();
    }
  };

  const template_id = useSearchParams().get("template_id");

  useEffect(() => {
    if (template_id) setOpenPrompt(true);
  }, [template_id]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default action if needed
      if (inputText.trim() !== "") {
        sendPrompt(inputText, propsAttachments.files);
      }
    }
  };

  const handleImport = (template: TemplateItem) => {
    setSelectedPrompt(template);
  };

  const onSubmit = () => {
    if (isStreaming) {
      if (!isPendingForStop) {
        stopGenerate({ abortFetch: false });
      }
    } else {
      if (inputText.trim() !== "") {
        sendPrompt(inputText, propsAttachments.files);
      }
    }
  };

  const onDeleteTemplate = () => {
    setSelectedPrompt(undefined);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full h-full items-start gap-4">
        <div
          className={` w-full p-4  ${propsAttachments.files.length !== 0 ? "pt-0" : "pt-4"} relative flex flex-col items-end   rounded-xl bg-input `}
        >
          <div
            className={`w-full  ${propsAttachments.files.length !== 0 && "mb-4"} `}
          >
            {propsAttachments.content}
          </div>
          <AppModals.Template
            open={openPrompt}
            onClose={() => setOpenPrompt(false)}
            onImportPrompt={handleImport}
          />
          <RenderIf isTrue={!!selectedPrompt}>
            <div className="row bg-holder-dark rounded p-2 w-full mb-2 gap-1">
              <AppTypo className="me-auto" variant="small">
                {selectedPrompt?.topic}
              </AppTypo>
              <MinimalButton
                size="xs"
                icon="mdi:text-box-edit-outline"
                onClick={() => {
                  setInputText(selectedPrompt!.prompt);
                  setSelectedPrompt(undefined);
                }}
              />
              <MinimalButton
                size="xs"
                icon="mdi:open-in-new"
                onClick={() =>
                  setSearchParams("template_id", selectedPrompt?.id?.toString())
                }
              />
              <MinimalButton
                size="xs"
                icon="mdi:delete-outline"
                onClick={onDeleteTemplate}
              />
            </div>
          </RenderIf>
          <textarea
            placeholder={chatDictionary.prompt_input_placeholder}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={1}
            ref={textAreaRef}
            className="hide-scrollbar max-h-28 min-h-9 w-full resize-none border-0 bg-transparent p-1 outline-none ring-0 h-fit mb-1"
            onKeyDown={handleKeyDown}
          />

          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-1.5 h-8">
              {/* </PromptSectionDialog> */}
              <UploadFileChat
                setActiveTypeFile={setActiveTypeFile}
                propsAttachments={propsAttachments}
              />
              {/* <PromptSectionDialog>  this is modal triger  */}
              <MinimalButton
                icon="ic:outline-book"
                title="Library Prompt"
                onClick={() => setOpenPrompt(true)}
              />

              <MinimalButton
                tooltipColor="success"
                disabled={true}
                icon="streamline:web"
                title={`${chatDictionary.chat_tools_webAccess_label} (${common.coming_soon})`}
              />
            </div>
            <div className="flex flex-row gap-1.5">
              {btnSpeech}
              <MinimalButton
                onClick={onSubmit}
                variant="fill"
                disabled={
                  //when user start conversation
                  !flagBtnSend ||
                  (!isStreaming && inputText.trim() === "") ||
                  propsAttachments.error
                }
                icon={
                  !isStreaming
                    ? "mdi:arrow-up"
                    : !isPendingForStop
                      ? "tabler:player-stop"
                      : "eos-icons:bubble-loading"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
