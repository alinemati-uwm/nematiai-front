"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import Image from "next/image";

import { social } from "@/components/layout/header/apps-header/highlight/constants";
import type {
  HighlightItemsType,
  HighlightResult,
} from "@/components/layout/header/apps-header/highlight/types";
import { DeleteAlertDialog, MinimalButton } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import CopyButton from "@/components/shared/CopyButton";
import RenderIf from "@/components/shared/RenderIf";
import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";
import { useGetDictionary, useTextToSpeech } from "@/hooks";

interface IProps {
  item?: HighlightResult;
  handleDelete?: () => void;
  setItemsToGenerate?: Dispatch<SetStateAction<HighlightItemsType[]>>;
  streamText: string;
}

/**
 * HighlightAccordion component renders an accordion with a header and content.
 * The header displays an optional icon and document name, and the content displays text.
 * The accordion can be toggled open or closed.
 *
 * @param {Object} props - The properties object.
 *
 * @returns JSX.Element The rendered HighlightAccordion component.
 */
export default function HighlightAccordion({
  item,
  setItemsToGenerate,
  streamText,
  handleDelete,
}: IProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const {
    components: {
      history_items: { delete_description, delete_item },
    },
  } = useGetDictionary();

  const text = item?.texts[currentPageIndex];
  const responseCount = item?.texts?.length || 0;

  const shareSocial =
    item && item?.name && social
      ? social[item.name.toLowerCase() as keyof typeof social]
      : null;

  const { handlePlaySpeak, handleStopSpeak, isSpeaking } = useTextToSpeech(
    text ? text : "",
  );

  useEffect(() => {
    setCurrentPageIndex(responseCount - 1);
  }, [responseCount]);

  const handleRegenerate = () => {
    if (!item) return;
    setItemsToGenerate!([item]);
  };

  if (responseCount === 0 && !streamText) return null;

  return (
    <div
      className={cn(
        "duration-300 p-2 rounded w-full bg-holder-light",
        isAccordionOpen ? "h-auto" : "min-h-9 max-h-9 overflow-y-hidden",
      )}
    >
      <div
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="flex justify-between cursor-pointer "
      >
        <p className=" font-bold mb-[14px] flex gap-[6px]">
          {item?.image && (
            <Image
              width={20}
              height={20}
              unoptimized
              src={item ? item.image : ""}
              alt=""
            />
          )}
          {item ? item?.name : "Your text"}
        </p>

        <AppIcon
          width={20}
          height={20}
          icon="mingcute:down -line"
          style={{
            transform: isAccordionOpen ? "rotate(180deg)" : "",
            transition: "all .3s",
          }}
        />
      </div>
      <div className=" relative  border flex flex-col p-2 gap-2 rounded text-label-light h-auto ">
        <div className="w-full h-auto ">
          <AppTypo className="w-[95%]">
            {item?.name
              ? item?.isStreaming && !!streamText
                ? streamText
                : text
              : streamText}
          </AppTypo>
        </div>
        <div className="flex justify-between items-center  ">
          <div className=" flex justify-end w-full">
            <div className="w-full ">
              <RenderIf isTrue={!!item && responseCount > 1 && !!item?.name}>
                <div className="flex gap-1 items-center">
                  <MinimalButton
                    variant="ghost"
                    icon="mdi:chevron-left"
                    disabled={currentPageIndex === 0}
                    onClick={() => {
                      if (currentPageIndex > 0)
                        setCurrentPageIndex(prev => prev - 1);
                    }}
                  />

                  <AppTypo>
                    {currentPageIndex + 1} of {responseCount}
                  </AppTypo>

                  <MinimalButton
                    disabled={currentPageIndex === responseCount - 1}
                    onClick={() => {
                      if (currentPageIndex < responseCount - 1)
                        setCurrentPageIndex(prev => prev + 1);
                    }}
                    variant="ghost"
                    icon="mdi:chevron-right"
                  />
                </div>
              </RenderIf>
            </div>

            {!!item && !!item?.name && (
              <>
                <DeleteAlertDialog
                  key={item.id}
                  title={item.name}
                  description={delete_description}
                  Trigger={
                    <MinimalButton
                      icon="ic:outline-delete"
                      size="xs"
                      className="text-danger"
                      title="Delete"
                    />
                  }
                  handleSubmit={() => handleDelete?.()}
                  labelButton={delete_item}
                />

                <MinimalButton
                  icon={
                    isSpeaking
                      ? "tabler:player-stop-filled"
                      : "heroicons:speaker-wave"
                  }
                  size="xs"
                  title="Speaker"
                  color={isSpeaking ? "danger" : "default"}
                  onClick={() =>
                    isSpeaking ? handleStopSpeak() : handlePlaySpeak()
                  }
                />
                <MinimalButton
                  icon="uis:redo"
                  size="xs"
                  title="Regenerate"
                  onClick={handleRegenerate}
                />
              </>
            )}
            <CopyButton text={text || ""} />
          </div>

          {item && item?.name && shareSocial && (
            <shareSocial.item url={`${location.href}`} title={text}>
              <MinimalButton size="xs" icon="ic:outline-share" title="Share" />
            </shareSocial.item>
          )}
        </div>
      </div>
    </div>
  );
}
