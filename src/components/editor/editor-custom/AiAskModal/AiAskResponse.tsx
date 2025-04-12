// components/DraggableComponent.tsx
import React, { useEffect, useState } from "react";

import { type SetStateAction } from "jotai";

import { Show } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import MarkdownRenderer from "@/components/shared/markdown-rendered/MarkdownRendered";
import { MinimalButton } from "@/components/shared/MinimalButtton";
import EditableDialog from "@/components/ui/EditAndCopy";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  messageText: string;
  isStreaming: boolean;
  index: number;
  setIndex: React.Dispatch<SetStateAction<number>>;
  allAnswers: string[];
  onRegenerate: () => void;
  handleReplace: () => void;
  handleInsert: () => void;
}

function AiAskResponse({
  messageText,
  isStreaming,
  index,
  setIndex,
  allAnswers,
  onRegenerate,
  handleReplace,
  handleInsert,
}: IProps) {
  const [openDialogEditMessageBeforeCopy, setOpenDialogEditMessageBeforeCopy] =
    useState(false);

  useEffect(() => {
    return () => {
      setOpenDialogEditMessageBeforeCopy(false);
    };
  }, [index]);

  const message = isStreaming ? messageText : allAnswers[index] || "";

  if (!isStreaming && message.length === 0) return null;

  return (
    <div className="flex flex-col relative w-full px-1">
      <div className="flex flex-col w-full h-full ">
        <Show>
          <Show.When isTrue={isStreaming && messageText.length < 5}>
            <Skeleton className="w-full h-3 rounded-sm mb-2" />
            <Skeleton className="w-full h-3 rounded-sm mb-2" />
            <Skeleton className="w-1/2 h-3 rounded-sm" />
          </Show.When>
          <Show.Else>
            <div className="overflow-y-auto max-h-80 px-2 pb-2" dir="auto">
              <MarkdownRenderer content={message || ""} />
            </div>

            <div className="flex-row flex justify-between border-t">
              <div className="flex-row flex justify-end ">
                {allAnswers.length > 1 && (
                  <div className="flex  text-large gap-2   items-center text-label-light ">
                    <button
                      onClick={() => {
                        setIndex(prev => prev - 1);
                      }}
                      disabled={index == 0 || isStreaming}
                      className="hover:bg-muted-dark transition-all rounded-lg outline-none"
                    >
                      <AppIcon icon="mdi:chevron-left" />
                    </button>
                    <span>{` ${index + 1} / ${allAnswers.length} `}</span>
                    <button
                      onClick={() => {
                        setIndex(prev => prev + 1);
                      }}
                      disabled={index === allAnswers.length - 1 || isStreaming}
                      className="hover:bg-muted-dark transition-all rounded-lg outline-none"
                    >
                      <AppIcon icon="mdi:chevron-right" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-1 pt-1">
                <EditableDialog
                  open={openDialogEditMessageBeforeCopy}
                  setOpen={setOpenDialogEditMessageBeforeCopy}
                  content={<> {message}</>}
                />
                <MinimalButton
                  disabled={isStreaming}
                  icon="tabler:edit"
                  title="edit"
                  onClick={() => setOpenDialogEditMessageBeforeCopy(true)}
                />
                <MinimalButton
                  disabled={isStreaming}
                  icon="bi:arrow-repeat"
                  title="Regenerate"
                  onClick={onRegenerate}
                  className={isStreaming ? "animate-spin-slow" : ""}
                />
                <MinimalButton
                  icon="codicon:replace-all"
                  onClick={handleReplace}
                  title="Replace"
                  disabled={isStreaming}
                />
                <MinimalButton
                  icon="tabler:text-plus"
                  onClick={handleInsert}
                  title="Insert"
                  disabled={isStreaming}
                />
              </div>
            </div>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}

export default AiAskResponse;
