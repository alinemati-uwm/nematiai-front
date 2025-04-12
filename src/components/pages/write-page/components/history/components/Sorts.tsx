import React, { useContext } from "react";

import AppTypo from "@/components/ui/AppTypo";
import useAppCategory from "@/hooks/category/useAppCategory";
import useBreakpoint from "@/hooks/useBreakpoint";

import WritePageContext from "../../../context";

function WriteTemplateSorts() {
  const { isGreaterThan } = useBreakpoint();
  const { getItems } = useAppCategory();
  const aiWriteItems = getItems("ai_write");
  const {
    methods: { updateState },
    states: { appType },
  } = useContext(WritePageContext);

  const items: { caption: string; appType: AppsType }[] = [
    {
      caption: "All",
      appType: "all_writer",
    },
    ...(aiWriteItems?.length
      ? aiWriteItems
          .filter(el => el.appType)
          .map(el => ({
            caption: el.i18Key.toString() ?? "",
            appType: el.appType ?? "ai_writer",
          }))
      : []),
  ];

  return (
    <div className="flex flex-row items-center justify-center md:justify-end gap-x-1 lg:gap-x-2">
      {items.map((el, key) => (
        <div
          key={key}
          className="flex flex-row items-center gap-x-1 lg:gap-x-2 cursor-pointer"
          onClick={() => updateState("appType", el.appType)}
        >
          {key !== 0 ? (
            <div className="h-3 border-r border-muted-darker" />
          ) : null}

          <AppTypo
            className={`${el.appType === appType ? "font-semibold text-primary" : ""} capitalize`}
            variant={isGreaterThan("md") ? "default" : "small"}
          >
            {el.caption}
          </AppTypo>
        </div>
      ))}
    </div>
  );
}

export default WriteTemplateSorts;
