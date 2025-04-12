"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import AppBadge from "@/components/ui/AppBadge";
import AppTypo from "@/components/ui/AppTypo";
import useExtractTextFromJson from "@/hooks/useExtractTextFromJson";
import { cn } from "@/lib/utils";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useGetDictionary } from "@/hooks";

import HistoryTime from "./HistoryTime";

interface Props {
  uuid: string;
  versions: Version;
  appType: string;
  mainAnswer: string;
}

export function HistoryChild({ uuid, versions, appType, mainAnswer }: Props) {
  const { setHistoryIsOpen } = useHistoryStore();

  const clickHandler = (data: Version) => {
    const obj = {
      id: data.id,
      answer_text: data.answer_text,
      uuid: uuid,
      app_type: appType,
      created_at: versions.updated_at,
    };
  };
  const { common: lang } = useGetDictionary();
  const extractedTexts = useExtractTextFromJson(versions.answer_text);
  const nonEmptyText =
    extractedTexts.length > 0
      ? extractedTexts.filter((item: any) => item && item.length > 0)
      : ["edit text is blank"];

  const params = useSearchParams();
  const selected =
    params.get("uuid") === uuid && versions.uuid === params.get("version");

  return (
    <>
      {versions.answer_text !== mainAnswer && (
        <Link
          href={`?uuid=${uuid}&version=${versions.uuid}`}
          className="w-full"
          onClick={() => setHistoryIsOpen(false)}
        >
          {" "}
          <div className="flex flex-row  mb-2">
            <div className="flex w-[10%]">
              <AppIcon
                icon="ph:arrow-elbow-down-right"
                width={30}
                className="text-primary-light"
              />
            </div>
            <div
              onClick={() => clickHandler(versions)}
              className={cn(
                "h-full flex w-[90%] items-start cursor-pointer p-2  border rounded-lg min-h-16 ",
                selected && " bg-primary-lighter border border-primary ",
              )}
            >
              <div className="flex flex-col justify-between w-full gap-2 ">
                <div className={cn(" w-[calc(100%-20px)] truncate font-[400]")}>
                  {nonEmptyText[0]}
                </div>{" "}
                <div className="flex flex-row justify-center items-center gap-2">
                  {(versions.audio || versions.podcast) && (
                    <div className="flex gap-2">
                      {versions.audio && (
                        <AppBadge variant={selected ? "primary" : "light"}>
                          {lang.Voice}
                        </AppBadge>
                      )}
                      {versions.podcast && (
                        <AppBadge variant={selected ? "primary" : "light"}>
                          {lang.Podcast}
                        </AppBadge>
                      )}
                    </div>
                  )}
                  <span className="text-[#B9BAC0] ml-auto">
                    {" "}
                    <AppTypo variant="small" type="label" color="secondary">
                      <HistoryTime date={versions.updated_at} />
                    </AppTypo>
                  </span>
                </div>
                {/*delete and bookmark buttons*/}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
