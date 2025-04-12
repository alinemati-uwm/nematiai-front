import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface Props {
  sidePanelIsOpen: boolean;
  setSidePanelIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderOfSideBar = ({ sidePanelIsOpen, setSidePanelIsOpen }: Props) => {
  return (
    <div className="w-full min-h-16 h-16 bg-primary text-white items-center justify-between flex flex-row px-2">
      {sidePanelIsOpen && (
        <div className="text-large font-[500]">History Upload</div>
      )}

      <Image
        onClick={() => setSidePanelIsOpen(prev => !prev)}
        src="/images/button/close-button.svg"
        width={18}
        height={18}
        alt="close"
        className={cn(
          "cursor-pointer transition-all",
          !sidePanelIsOpen && "mx-auto rotate-180 ",
        )}
      />
    </div>
  );
};

export default HeaderOfSideBar;
