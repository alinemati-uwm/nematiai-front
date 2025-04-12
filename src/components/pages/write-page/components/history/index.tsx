import React from "react";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import WriteTemplateList from "./components/list/List";
import MainWriteSearch from "./components/Search";
import WriteTemplateSorts from "./components/Sorts";

function WriteHistory() {
  const {
    page: {
      write: { write_history },
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-center md:text-justify">
        <AppTypo variant="headingM">{write_history}</AppTypo>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4 gap-y-4 md:gap-2">
        <MainWriteSearch />
        <WriteTemplateSorts />
      </div>
      <WriteTemplateList />
    </div>
  );
}

export default WriteHistory;
