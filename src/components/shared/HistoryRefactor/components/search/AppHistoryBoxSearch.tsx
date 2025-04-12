import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { Input } from "@/components/ui/input";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useGetDictionary } from "@/hooks";

interface props {
  searchFn(keyword: string): void;
}

function AppHistoryBoxSearch({ searchFn }: props) {
  const { setHistoryIsOpen } = useHistoryStore();
  const {
    components: {
      apps_header: { history },
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <AppTypo variant="headingM">{history}</AppTypo>
        <AppIcon
          icon="iconamoon:close-light"
          className="cursor-pointer"
          color="#747474"
          width={16}
          onClick={() => setHistoryIsOpen(false)}
        />
      </div>
      <div className="relative h-[32px] flex flex-row items-center border border-muted-dark rounded">
        <Input
          icon="ion:search"
          type="text"
          onChange={e => searchFn(e.target.value)}
          placeholder="Search"
        ></Input>
      </div>
    </div>
  );
}

export default AppHistoryBoxSearch;
