import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Input } from "@/components/ui/input";

interface Props {
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>;
  sidePanelIsOpen: boolean;
  setSidePanelIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchHistoryChatPdf = ({
  setSearchedValue,
  sidePanelIsOpen,
  setSidePanelIsOpen,
}: Props) => {
  return (
    <div
      className="w-full  relative h-auto  px-2 "
      onClick={() => {
        if (!sidePanelIsOpen) {
          setSidePanelIsOpen(true);
        }
      }}
    >
      <div
        className={
          sidePanelIsOpen
            ? "w-full  relative"
            : "!w-10 !h-10 mx-auto  cursor-pointer rounded-md bg-[#F8F8FB] flex justify-center items-center"
        }
      >
        <AppIcon
          icon="ion:search-outline"
          className={sidePanelIsOpen ? "absolute top-3 left-2" : ""}
          width={18}
        />
        {sidePanelIsOpen && (
          <Input
            onChange={e => setSearchedValue(e.target.value)}
            className="w-full mx-auto h-10 pl-7"
            placeholder="Search"
          />
        )}
      </div>
    </div>
  );
};

export default SearchHistoryChatPdf;
