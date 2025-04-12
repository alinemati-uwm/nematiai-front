"use client";

import React, { useEffect, useRef, useState } from "react";

import RenderIf from "@/components/shared/RenderIf";
import { promptVariant } from "@/components/ui/variants";
import { cn } from "@/lib/utils";

import AppTypo from "../AppTypo";
import useAttachments from "../attachments/Attachments";
import type { FilesType } from "../attachments/types";
import { useSpeechToText } from "../useSpeechToText";
import Btns from "./Btns";

export type Prompt = {
  title?: string;
  placeholder?: string;
  onGetNewFile: (files: FilesType) => void;
  onKeydown?: (text: string, files: File[]) => void;
  onchange?: (text: string) => void;
  upload?: boolean;
  promptFn?: (prompt: string) => void;
  copy?: boolean;
  volume?: boolean;
  clean?: boolean;
  maxsize?: number;
  initialValue?: string;
  loadingUpload?: boolean;
  key: number;
};

export default function usePrompt({
  key = -1,
  title = "",
  placeholder = "",
  upload = true,
  promptFn,
  copy = false,
  volume = false,
  clean = false,
  maxsize = 0,
  onGetNewFile,
  initialValue = "",
  onKeydown = () => {},
  onchange = value => {},
  loadingUpload = false,
}: Prompt) {
  const [inputText, setInputText] = useState(initialValue);
  const [counterSize, setCounterSize] = useState<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { content, showUpload, files, resetFile } = useAttachments({
    accept: [".pdf"],
    eachSize: 5,
    onGetNewFile,
  });

  const { content: btnSpeech, isSpeechRecognitionSupported } = useSpeechToText({
    transcript: inputText,
    setTranscript: val => setInputText(prev => (prev ? prev + " " + val : val)),
  });

  // Handle cleaning the div by clicking the trash icon
  useEffect(() => {
    setCounterSize(inputText.trim().length);
    onchange(inputText);
  }, [inputText]);

  useEffect(() => {
    if (key !== -1) {
      setInputText(initialValue);
      if (initialValue === "") {
        resetFile();
      }
    }
  }, [key]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default action if needed
      if (inputText.trim() !== "") {
        onKeydown(inputText, files);
      }
    }
  };

  const fileExist = files.length > 0;
  const isError = counterSize > maxsize;

  return {
    text: inputText,
    addText: (value: string) => {
      setInputText(value);
    },
    error: isError,
    content: (
      <div className="flex flex-col">
        <RenderIf isTrue={!!title}>
          <label className="text-base mb-label-space">{title}</label>
        </RenderIf>
        <div className="relative w-full h-fit group">
          <div
            className={cn(
              "top-[1px] absolute inset-x-2.5  hover:bg-holder-dark group-hover:bg-holder-dark",
              fileExist ? "h-16" : "h-3",
              isError
                ? "bg-danger-lighter"
                : "bg-holder-light group-focus-within:bg-holder-light ",
            )}
          >
            {content}
          </div>

          <RenderIf isTrue={isSpeechRecognitionSupported}>
            <div
              className={cn(
                "absolute start-2",
                fileExist ? "top-14 pt-1.5" : "top-2",
              )}
            >
              {btnSpeech}
            </div>
          </RenderIf>

          <textarea
            placeholder={placeholder || ""}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={7}
            ref={textAreaRef}
            className={cn(
              "w-full !pb-8 pe-2.5 rounded-[8px] group-hover:bg-holder-dark focus-visible:ring-0 focus-visible:outline-none",
              isError
                ? "border border-danger bg-danger-lighter text-danger-dark "
                : promptVariant({ variant: "prompt", color: "input" }),
              isSpeechRecognitionSupported ? "ps-9" : "ps-2.5",
              fileExist ? "pt-[66px]" : "pt-2.5",
            )}
            onKeyDown={onKeyDown}
          />

          <Btns
            isError={isError}
            upload={upload}
            showUpload={showUpload}
            btnSpeech={btnSpeech}
            inputText={inputText}
            copy={copy}
            volume={volume}
            clean={clean}
            setInputText={setInputText}
            resetFile={resetFile}
            loadingUpload={loadingUpload}
            {...(promptFn && { promptFn })}
          />
        </div>
        <RenderIf isTrue={maxsize !== 0}>
          <AppTypo
            variant="small"
            color={counterSize > maxsize ? "danger" : "secondary"}
          >
            {counterSize}/{maxsize}
          </AppTypo>
        </RenderIf>
      </div>
    ),
  };
}
