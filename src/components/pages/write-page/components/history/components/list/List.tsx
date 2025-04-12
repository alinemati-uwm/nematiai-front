import React, { useContext, useEffect } from "react";

import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import HistoryTime from "@/components/shared/HistoryRefactor/components/box/HistoryTime";
import AppHistoryIcons from "@/components/shared/HistoryRefactor/components/icons/AppHistoryIcons";
import useAppHistory from "@/components/shared/HistoryRefactor/useAppHistory";
import AppTypo from "@/components/ui/AppTypo";
import useAppCategory from "@/hooks/category/useAppCategory";

import WritePageContext from "../../../../context";
import WritePageEmpty from "./Empty";
import WritePageLoading from "./Loading";
import useWriteTemplateListModel from "./useWriteTemplateList";

function WriteTemplateList() {
  const {
    states,
    methods: { updateState },
  } = useContext(WritePageContext);
  const { data, query } = useAppHistory({ type: states.appType });
  const { getItems } = useAppCategory();
  const { routes } = useWriteTemplateListModel();

  useEffect(() => {
    updateState("data", data?.histories?.length ? data.histories : []);
  }, [data, states.appType]);

  const getItem = (appType: string) =>
    getItems("ai_write")?.find(el => el.appType === appType);

  const items = states.data.length
    ? states.data.filter((el: any) =>
        states.search?.length
          ? el.title.toLowerCase().search(states.search) >= 0
          : true,
      )
    : [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 pb-8">
      {query.isLoading ? (
        <WritePageLoading />
      ) : items.length ? (
        items?.map((el: any, key: any) => {
          const route = routes[el.app_type as AppsType];

          return (
            <div
              key={key}
              className="flex hover:bg-muted cursor-pointer justify-between relative items-end border  gap-y-6 rounded"
            >
              <Link
                href={route ? `${route}?uuid=${el.uuid}` : ""}
                className="lg:h-full flex flex-col gap-6 overflow-x-hidden w-full p-3"
              >
                <div className="flex  flex-row items-center gap-x-2">
                  <div
                    className={`w-6 h-6 flex justify-center items-center rounded-full ${getItem(el.app_type)?.classname ?? ""}`}
                  >
                    <AppIcon
                      icon={getItem(el.app_type)?.icon ?? ""}
                      width={16}
                    />
                  </div>
                  <AppTypo className="truncate w-[200px] " variant="headingXS">
                    {el.title}
                  </AppTypo>
                </div>
                <div className="flex flex-row pb-3 justify-between">
                  <AppTypo variant="small" color="secondary">
                    <HistoryTime date={el.created_at} />
                  </AppTypo>
                </div>
              </Link>
              <div className="flex justify-end gap-x-4 absolute right-3 items-end w-[0%] pb-3 ">
                <AppHistoryIcons
                  icons={["delete"]}
                  type="ai_writer"
                  refetch={query.refetch}
                  history={el}
                />
              </div>
            </div>
          );
        })
      ) : (
        <WritePageEmpty />
      )}
    </div>
  );
}

export default WriteTemplateList;
