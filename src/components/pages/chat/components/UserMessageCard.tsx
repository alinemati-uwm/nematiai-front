"use client";

import React, { useState, type JSX } from "react";

import dynamic from "next/dynamic";

import { MinimalButton, Show } from "@/components/shared";
import CopyButton from "@/components/shared/CopyButton";
import Loading from "@/components/shared/Loading";
import MarkdownRenderer from "@/components/shared/markdown-rendered/MarkdownRendered";
import EditableDialog from "@/components/ui/EditAndCopy";
import { UserAvatar } from "@/components/user";
import { cn } from "@/lib/utils";
import { useGetDictionary, useTextToSpeech } from "@/hooks";
import useGetMe from "@/refactor_lib/hooks/queries/useGetMe";

import ViewListFiles from "./ViewListFiles";
import type { ViewListFilesProps } from "./ViewListFiles";

const PromptEdit = dynamic(() => import("./PromptEdit"), {
  loading: () => <Loading />,
});

interface IProps {
  messageText: string;
  date: string | null | undefined;
  files: ViewListFilesProps["files"];
  viewFiles?: JSX.Element;
  generateConversation(val: string): void;
  flagBtnSend: boolean;
  isFirstMessage: boolean;
  setIsEdit(val: boolean): void;
  isEdit: boolean;
  prevChatId: number;
  onCreateNewMessage(): void;
  counter: React.ReactNode;
}

/**
 * in this component we show user message card
 * @param timeLine time line of message
 * @param messageText text of message
 * @param files files of message
 * @param viewFiles view files of message
 * @param generateConversation generate conversation
 * @param flagBtnSend flag of send button
 * @param isFirstMessage is first message
 * @param setIsEdit set is edit
 * @param isEdit is edit
 * @param prevChatId previous chat id
 * @param onCreateNewMessage create new message
 * @param counter counter
 * @constructor
 */
export function UserMessageCard({
  messageText,
  files,
  viewFiles,
  generateConversation,
  flagBtnSend,
  isFirstMessage = false,
  setIsEdit,
  isEdit,
  prevChatId,
  onCreateNewMessage,
  counter,
}: IProps) {
  //speech
  const { isSpeaking, handlePlaySpeak, handleStopSpeak } = useTextToSpeech(
    messageText as string,
  );

  const [openDialogEditMessageBeforeCopy, setOpenDialogEditMessageBeforeCopy] =
    useState(false);
  //get users info for profile picture and name
  const { data: userData } = useGetMe();

  const {
    components: { custom_textarea: dictionary },
    common,
  } = useGetDictionary();

  return (
    <div className="flex flex-row gap-4 items-start group">
      {/*user image*/}
      <UserAvatar
        imageSrc={userData?.profile_image ?? ""}
        name={userData?.username ?? ""}
        className=" w-8 h-8 border"
        fallbackClassname="text-small"
      />

      <Show>
        <Show.When isTrue={isEdit}>
          <div className="col min-h-20 w-full justify-center items-center flex">
            <PromptEdit
              text={messageText ? messageText : ""}
              generateConversation={generateConversation}
              flagBtnSend={flagBtnSend}
              setIsEdit={setIsEdit}
              prevChatId={prevChatId}
              ongenerate={() => {
                onCreateNewMessage();
              }}
            />
          </div>
        </Show.When>

        <Show.Else>
          <div className="focus:ouline-none flex w-full flex-col items-center gap-1 border-none outline-none">
            {files.length !== 0 && (
              <div className="w-full">
                <ViewListFiles files={files}></ViewListFiles>
              </div>
            )}
            {viewFiles && (
              <div className="w-full gap-1 flex row overflow-y-auto scroll justify-end">
                {viewFiles}
              </div>
            )}

            <div className="flex w-full gap-2 pt-1.5">
              <div
                style={{ width: "calc(100% - 25px)" }}
                className={cn("text-base overflow-x-auto")}
              >
                {messageText ? messageText : ""}{" "}
              </div>
            </div>

            <div className=" flex  w-full items-center ">
              <div>{counter}</div>
              <div className=" flex flex-1 flex-row gap-2 opacity-0 group-hover:opacity-100">
                <MinimalButton
                  size="xs"
                  icon="tabler:edit"
                  title="Edit before copy"
                  onClick={() => setOpenDialogEditMessageBeforeCopy(true)}
                />
                {!isFirstMessage && (
                  <MinimalButton
                    size="xs"
                    icon="iconamoon:edit-light"
                    title={common.edit}
                    onClick={() => setIsEdit(true)}
                  />
                )}
                <CopyButton text={messageText} />

                <MinimalButton
                  size="xs"
                  selected={isSpeaking}
                  icon={
                    isSpeaking ? "tabler:player-stop-filled" : "tabler:volume"
                  }
                  title={dictionary.speak_button_label}
                  onClick={() =>
                    isSpeaking ? handleStopSpeak() : handlePlaySpeak()
                  }
                  color={isSpeaking ? "danger" : "default"}
                />

                <EditableDialog
                  open={openDialogEditMessageBeforeCopy}
                  setOpen={setOpenDialogEditMessageBeforeCopy}
                  content={
                    <MarkdownRenderer
                      content={messageText ? messageText : ""}
                      isStreaming={false}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </Show.Else>
      </Show>
    </div>
  );
}
