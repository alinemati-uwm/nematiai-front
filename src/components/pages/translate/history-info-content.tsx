"use client";

import React from "react";

import { MinimalButton } from "@/components/shared";
import { cn } from "@/lib/utils";
import { useHistoryStore } from "@/stores/zustand/history-store";
import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useTextToSpeech,
} from "@/hooks";

interface DivWrapperProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
function DivWrapper({ children, className, ...otherProps }: DivWrapperProps) {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-start rounded-md border border-black px-4 py-1",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
export function HistoryInfoContent() {
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value
  const { handlePlaySpeak, handleStopSpeak, isSpeaking } = useTextToSpeech(
    selectedHistoryItem?.answer_text ?? "",
  );
  const {
    common: { copy },
    components: { custom_textarea: dictionary },
    page: { translate },
  } = useGetDictionary();
  return (
    <div className="grid gap-10  ">
      {/* show selected language*/}
      <div className="grid grid-cols-2 gap-16">
        <div className="grid items-start gap-3">
          <span>{translate.text_language}</span>
          <DivWrapper>Auto detect</DivWrapper>
        </div>
        <div className="grid items-start gap-3">
          <span>{translate.translation_language}</span>
          <DivWrapper>English</DivWrapper>
        </div>
      </div>
      {/* show prompt and inputs*/}
      <div className="grid items-start gap-3">
        <span>{translate.text_label}</span>
        <div className="relative">
          <textarea
            defaultValue={selectedHistoryItem?.answer_text}
            className="w-full  rounded-md border border-black px-4 py-1 pb-8"
            rows={8}
            disabled
          />
          <div className="row  absolute bottom-4 end-4 gap-1 bg-white">
            {isSpeaking ? (
              <button
                onClick={handleStopSpeak}
                className=" flex h-5 w-5 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
              >
                <svg
                  className="h-12 w-12 "
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            ) : (
              <MinimalButton
                icon="heroicons:speaker-wave"
                title={dictionary.speak_button_label}
                onClick={handlePlaySpeak}
              />
            )}
            <MinimalButton
              icon={isCopied ? "lucide:copy-check" : "lucide:copy"}
              title={copy}
              onClick={() => handleCopy(selectedHistoryItem?.answer_text ?? "")}
            />
          </div>
        </div>
      </div>
      {/*show options*/}
      <div className="grid grid-cols-2 gap-16">
        <div className="grid items-start gap-3">
          <span>{translate.tone_label}</span>
          <DivWrapper>1024 x 1024px</DivWrapper>
        </div>
        <div className="grid items-start gap-3">
          <span>{translate.style_label}</span>
          <DivWrapper>Anime</DivWrapper>
        </div>
      </div>
      {/*show url or file*/}
      <div className="grid items-start gap-3">
        <span>{translate.Url_label}</span>
        <DivWrapper>http://www.google.com</DivWrapper>
      </div>

      {/*show tags*/}
      <div className="grid items-start gap-3">
        <span>{translate.tags}</span>
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <span
              className="rounded-md bg-muted p-3 text-label-light"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const tags = [
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "tag5",
  "Email",
  "Message",
  "Phone",
  "Comment",
  "Twitter",
  "Blog Post",
];
