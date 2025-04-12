"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useDrawerInfo } from "@/components/pages/chat/hooks/useDrawerInfo";
import { MinimalButton } from "@/components/shared";
import CopyButton from "@/components/shared/CopyButton";
import MarkdownRenderer from "@/components/shared/markdown-rendered/MarkdownRendered";
import RenderIf from "@/components/shared/RenderIf";
import EditableDialog from "@/components/ui/EditAndCopy";
import PopoverList from "@/components/ui/PopoverList";
import { UserAvatar } from "@/components/user";
import { type typeHandleRegenerate } from "@/hooks/useHandleChatBotConversation";
import { cn } from "@/lib/utils";
import { useChatbotStore } from "@/stores/zustand/chat";
import type { Conversation } from "@/stores/zustand/chat/types";
import { useGetDictionary, useTextToSpeech } from "@/hooks";
import useLikeOrDislike from "@/refactor_lib/hooks/mutations/useLikeOrDislike";

interface Props {
  message: Conversation;
  isLastMessage: boolean;
  messageText: string;
  handleRegenerate: typeHandleRegenerate;

  setRegeneratedMessageId(id: number): void;

  date: string | null | undefined;
  app_name: AppsType;

  onClickOnRegenerate(): void;

  counter: React.ReactNode;
  prevChatId: number;
}

export function AssistMessageCard({
  onClickOnRegenerate,
  messageText,
  message,
  isLastMessage,
  setRegeneratedMessageId,
  handleRegenerate,
  app_name,
  counter,
  prevChatId,
}: Props) {
  const [openEditBeforeCopy, setOpenEditBeforeCopy] = useState(false);
  const [like, setLike] = useState(message.like);
  const [isOpenMoreActions, setIsOpenMoreActions] = useState(false);
  const isStreaming = useChatbotStore.use.isStreaming();
  const router = useRouter();
  const { show, setActiveMenu } = useDrawerInfo();

  const { documentName } = useChatbotStore(state => ({
    documentName: state.documentName,
  }));

  const { handlePlaySpeak, handleStopSpeak, isSpeaking } = useTextToSpeech(
    messageText as string,
  );

  const {
    components: { custom_textarea: dictionary },
    common: lang,
    page: { chat: chatDictionary },
  } = useGetDictionary();

  const { mutateAsync: setLikeOrDislike, isPending: likeOrDislikePending } =
    useLikeOrDislike(app_name);

  const handleLikeAndDislike = async (
    newLike: "like" | "dislike" | "no_idea",
  ) => {
    if (likeOrDislikePending) return;

    const finalLike = newLike === like ? "no_idea" : newLike;
    setLike(finalLike);
    await setLikeOrDislike({
      chat_id: message.id,
      like: finalLike,
    });
  };

  const onEditCodeClick = (code: string, language: string) => {
    show({
      active: "editor",
      editor: {
        codeLanguage: language,
        title: documentName,
        text: code,
      },
    });
  };

  const MarkdownRendererMessage = (
    <MarkdownRenderer
      content={messageText ? messageText : ""}
      isLastMessage={isLastMessage}
      onEditCode={onEditCodeClick}
      isStreaming={isStreaming}
    />
  );

  const onRegenerate = () => {
    if (message.id === -10 || message.id === -1 || message.id === -2) return;
    setRegeneratedMessageId(message.id);
    handleRegenerate({ prevChatId });
    onClickOnRegenerate();
  };

  const setMenuInfo = (
    menu: "document" | "mindmap" | "humanize",
    open: boolean = true,
  ) => {
    {
      (open ? show : setActiveMenu)({
        active: menu,
        editor: {
          title: documentName,
          text: messageText,
        },
      });
    }
  };

  const moreActions = [
    {
      icon: "mdi:playlist-edit",
      title: chatDictionary.open_to_note,
      onClick: () => setMenuInfo("document"),
    },
    {
      icon: "material-symbols:graph-3",
      title: chatDictionary.mindmap,
      onClick: () => setMenuInfo("mindmap"),
    },
    {
      icon: "solar:user-linear",
      title: chatDictionary.humanize,
      onClick: () => {
        setMenuInfo("humanize", false);
        router.push("/write/humanize?app=humanize");
      },
    },
    {
      icon: like === "like" ? "mdi:like" : "mdi:like-outline",
      title: chatDictionary.like,
      onClick: () => handleLikeAndDislike("like"),
      selected: like === "like",
    },
    {
      icon: like === "dislike" ? "mdi:dislike" : "mdi:dislike-outline",
      title: chatDictionary.dislike,
      onClick: () => handleLikeAndDislike("dislike"),
      selected: like === "dislike",
    },
  ];

  return (
    <div className="group w-full flex max-w-[100%] gap-4  flex-row ">
      {/*assist image*/}
      <div>
        <UserAvatar
          imageSrc={message.model_icon || ""}
          name=""
          className="w-8 h-8"
          fallbackClassname="text-small"
        />
      </div>

      <div className="flex-1 items-start max-w-[calc(100%-2rem)] ">
        {/*content box*/}
        <div className="w-full pt-1.5">
          {/*speaker icon and prompt*/}
          <div className="flex ">
            <div className=" focus:ouline-none flex w-full flex-col items-center border-none outline-none">
              <div className="flex w-full max-w-[100%] lg:max-w-[760px]">
                <div
                  className="  markdown-container flex "
                  style={{ width: "calc(100% - 25px)" }}
                >
                  {MarkdownRendererMessage}
                </div>
              </div>

              <RenderIf isTrue={!!messageText && messageText.length > 0}>
                <div className=" row w-full  flex-row ">
                  <div>{counter}</div>
                  <div
                    className={cn(
                      " flex flex-row gap-2 opacity-0 group-hover:opacity-100",
                      isOpenMoreActions && "opacity-100",
                    )}
                  >
                    <RenderIf isTrue={isLastMessage}>
                      <MinimalButton
                        icon="uis:redo"
                        title="regenerate"
                        onClick={onRegenerate}
                        size="xs"
                      />
                    </RenderIf>

                    <MinimalButton
                      icon="bx:edit"
                      title={chatDictionary.edit_and_copy_with_sign}
                      onClick={() => setOpenEditBeforeCopy(true)}
                      size="xs"
                    />
                    <CopyButton text={messageText!.toString()} />

                    <MinimalButton
                      icon={
                        isSpeaking
                          ? "tabler:player-stop-filled"
                          : "tabler:volume"
                      }
                      title={dictionary.speak_button_label}
                      onClick={isSpeaking ? handleStopSpeak : handlePlaySpeak}
                      color={isSpeaking ? "danger" : "default"}
                      size="xs"
                    />

                    <PopoverList
                      icon="nrk:more"
                      title={lang.more}
                      isOpen={isOpenMoreActions}
                      setIsOpen={setIsOpenMoreActions}
                      list={moreActions}
                    />

                    <EditableDialog
                      open={openEditBeforeCopy}
                      setOpen={setOpenEditBeforeCopy}
                      content={MarkdownRendererMessage}
                    />
                  </div>
                </div>
              </RenderIf>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
