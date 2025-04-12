import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

import { type ExploreNewsData } from "../../../newsTypes";
import ExploreSearchSetting from "./Setting";
import useHookExploreSearch from "./useHookExploreSearch";

function ExploreSearch({
  categoryList,
}: {
  categoryList?: ExploreNewsData["getNewsCategories"];
}) {
  const { keyword, searchFn, setKeyword } = useHookExploreSearch();
  const {
    page: {
      explore: { ask_any_thing, go },
    },
  } = useGetDictionary();

  return (
    <div className="m-auto relative w-[95%] sm:w-[90%] max-w-[466px]">
      <div className="flex flex-row items-center gap-x-4 absolute right-2 z-10 top-1/2 -translate-y-1/2">
        <ExploreSearchSetting categoryList={categoryList} />
        <AppIcon icon="eva:attach-fill" className="cursor-pointer" width={14} />
        <Button onClick={searchFn} className="flex flex-row items-center">
          {go}
          <AppIcon icon="ri:arrow-right-line" width={14} />
        </Button>
      </div>
      <Input
        placeholder={ask_any_thing}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className="!h-11 pr-[32%]"
      />
    </div>
  );
}

export default ExploreSearch;
