import React, { useEffect, useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { type typeHeaderOfFirstLevel } from "@/components/layout/types";
import usePodcastSingle from "@/components/pages/podcast/id/usePodcastSingle";
import InputDocumentName from "@/components/shared/InputDocumentName";
import AppBadge from "@/components/ui/AppBadge";
import AppTypo from "@/components/ui/AppTypo";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useGetDictionary } from "@/hooks";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";

import useAppHistory from "../../useAppHistory";
import AppHistoryIcons from "../icons/AppHistoryIcons";
import AppHistoryBoxSearch from "../search/AppHistoryBoxSearch";
import { HistoryChild } from "./HistoryChild";
import HistoryEmpty from "./HistoryEmpty";
import HistorySkeletons from "./HistorySkeletons";
import HistoryTime from "./HistoryTime";

function AppHistory(props: typeHeaderOfFirstLevel["history"]) {
  const titleOfquerySelector = props?.titleOfquerySelector || "uuid";
  const apptype = props?.type || "chat_bot";
  const { query, data } = useAppHistory(props);
  const [list, setList] = useState<HistoryAPIResponse["answers"][]>([]);
  const { isHistoryOpen, setHistoryIsOpen } = useHistoryStore();
  const params = useSearchParams();
  const { common: lang } = useGetDictionary();
  const { id } = usePodcastSingle();

  useEffect(() => {
    setList(data?.histories ?? []);
  }, [data]);

  useEffect(() => {
    return () => {
      setList([]);
    };
  }, []);

  const search = (keyword: string) => {
    const result = data?.histories.filter(el =>
      el.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    if (result.length) setList(result);
    else setList(data.histories);
  };

  return (
    <Dialog open={isHistoryOpen} onOpenChange={() => setHistoryIsOpen(false)}>
      <DialogContent
        effect={false}
        className={`flex flex-col right-0 top-0 bottom-0 left-auto items-start max-h-[unset] max-w-[unset] h-full w-full m-0 translate-y-0 translate-x-0 sm:w-[300px] transition-all data-[state=open]:animate-in data-[state=closed]:animate-out duration-1000 data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-0 transform ${isHistoryOpen ? "shadow-xl" : ""} p-4`}
      >
        <VisuallyHidden>
          <DialogTitle>Histories</DialogTitle>
        </VisuallyHidden>
        <AppHistoryBoxSearch searchFn={search} />
        <div className="h-[91%] w-full overflow-auto">
          {query.isLoading ? (
            <HistorySkeletons />
          ) : list.length ? (
            list.map((el, key) => {
              const selected =
                (!params.get("version") &&
                  params.get(titleOfquerySelector) === el?.uuid) ||
                id === el.uuid;

              return (
                <div className="w-full" key={key}>
                  <div className="border-t py-2">
                    <div
                      className={`flex flex-row gap-x-3 p-2 hover:bg-muted-light rounded ${selected ? "bg-primary-lighter border border-primary" : "border-transparent"}`}
                    >
                      {el.urls && el.urls.length ? (
                        <Image
                          src={el.urls[0]}
                          alt={el?.title ?? ""}
                          width={48}
                          height={48}
                          className="h-auto rounded"
                        />
                      ) : null}
                      <Link
                        href={`?${titleOfquerySelector}=${el?.uuid}`}
                        onClick={e => {
                          setHistoryIsOpen(false);
                        }}
                        className="flex flex-col gap-y-1 w-full cursor-pointer"
                      >
                        <div className="flex flex-row gap-x-1 items-center">
                          {el.model_generator ? (
                            <Image
                              src={el.model_generator.icon}
                              className="rounded-full w-5 h-5"
                              alt=""
                              width={20}
                              height={20}
                            />
                          ) : null}
                          <div className="max-w-[calc(100%-30px)]">
                            <InputDocumentName
                              justEdit={true}
                              appName={apptype}
                              value={el?.title}
                              showHover={true}
                              onChange={e => {
                                el.title = e;
                              }}
                              uuid={el.uuid}
                            />
                          </div>
                        </div>
                        {(el.audio || el.podcast) && (
                          <div className="flex gap-2">
                            {" "}
                            {el.audio && (
                              <AppBadge
                                variant={selected ? "primary" : "light"}
                              >
                                {lang.Voice}
                              </AppBadge>
                            )}
                            {el.podcast && (
                              <AppBadge
                                variant={selected ? "primary" : "light"}
                              >
                                {lang.Podcast}
                              </AppBadge>
                            )}
                          </div>
                        )}
                        <div className="flex flex-row gap-x-1 justify-between items-center">
                          <AppTypo
                            variant="small"
                            type="label"
                            color="secondary"
                            className="cursor-pointer"
                          >
                            <HistoryTime date={el.created_at} />
                          </AppTypo>
                          <div
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="flex flex-row gap-1"
                          >
                            {props?.type && (
                              <AppHistoryIcons
                                {...props}
                                refetch={query.refetch}
                                icons={["delete", "pin"]}
                                history={el}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {el.versions && el.versions.length > 0 && (
                    <HistoryChild
                      mainAnswer={el.answer_text}
                      uuid={el.uuid}
                      appType={el.app_type}
                      versions={el.versions[0]}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <HistoryEmpty />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AppHistory;
