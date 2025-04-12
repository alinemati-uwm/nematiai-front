"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { MinimalButton } from "@/components/shared";
import CopyButton from "@/components/shared/CopyButton";
import AppModals from "@/components/shared/modals/AppModals";
import { cn } from "@/lib/utils";
import { useGetDictionary, useTextToSpeech } from "@/hooks";
import type { TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import { type Prompt as PromptType } from "./Prompt";

type Prompt = {
  showUpload: () => void;
  btnSpeech: React.JSX.Element;
  inputText: string;
  setInputText: (value: string) => void;
  resetFile: () => void;
  isError?: boolean;
  onImportPrompt?: (template: TemplateAPIResponse["allTemplates"]) => void;
} & Pick<
  PromptType,
  "promptFn" | "upload" | "copy" | "loadingUpload" | "clean" | "volume"
>;

export default function Btns({
  upload,
  showUpload,
  promptFn,
  inputText,
  copy,
  volume,
  clean,
  setInputText,
  resetFile,
  isError,
}: Prompt) {
  const {
    components: { custom_textarea },
  } = useGetDictionary();
  const [promptShow, setPromptShow] = useState(false);
  const { handlePlaySpeak, handleStopSpeak, isSpeaking } = useTextToSpeech(
    inputText.trim() as string,
  );
  const template_id = useSearchParams().get("template_id");

  useEffect(() => {
    if (template_id) setPromptShow(true);
  }, [template_id]);

  return (
    <div
      className={cn(
        "absolute bottom-[7px] pb-0.5 inset-x-2.5 flex flex-row justify-between gap-1 group-hover:bg-holder-dark hover:bg-holder-dark",
        isError
          ? "bg-danger-lighter"
          : "bg-holder-light group-focus-within:bg-holder-light ",
      )}
    >
      <div className="flex flex-row gap-1">
        {promptFn && (
          <>
            <MinimalButton
              icon="icon-park-outline:bookmark"
              title="Library Prompt"
              onClick={() => setPromptShow(prev => !prev)}
            />
            <AppModals.Template
              onImportPrompt={template => promptFn(template.prompt)}
              onClose={() => setPromptShow(false)}
              open={promptShow}
            />
          </>
        )}

        {upload && ( //loadingUpload ? Icons.loading : "ic:outline-upload-file"
          <MinimalButton
            onClick={showUpload}
            icon="ic:outline-upload-file"
            title="upload File"
          />
        )}
      </div>

      <div className="flex flex-row gap-1">
        {clean && inputText.trim() !== "" && (
          <MinimalButton
            icon="ic:outline-delete"
            title={custom_textarea.clear_button_label}
            onClick={() => {
              setInputText("");
              resetFile();
            }}
          />
        )}
        {volume && inputText.trim() !== "" && (
          <MinimalButton
            icon={
              isSpeaking
                ? "tabler:player-stop-filled"
                : "heroicons:speaker-wave"
            }
            title={custom_textarea.speak_button_label}
            onClick={() => (isSpeaking ? handleStopSpeak() : handlePlaySpeak())}
            color={isSpeaking ? "danger" : "default"}
          />
        )}
        {copy && inputText.trim() !== "" && (
          <CopyButton text={inputText} size="sm" />
        )}
      </div>
    </div>
  );
}
