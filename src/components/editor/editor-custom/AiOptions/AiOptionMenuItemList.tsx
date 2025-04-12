import React, { useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  list: Array<{ title: string; value: string }>;
  selected?: string;
  setSelected?: (val: string) => void;
  className?: string;
  onChange?: (val: string) => void;
}

export default function AiOptionMenuItemList({
  onChange,
  list,
  selected,
  setSelected,
  title,
  className = "",
}: IProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  return (
    <Popover
      open={open}
      onOpenChange={val => {
        setOpen(val);
        setSearch(prev => (val ? prev : ""));
      }}
    >
      {/*delete popover button to open popover*/}
      <PopoverTrigger asChild onClick={e => e.stopPropagation()}>
        <div className="flex cursor-pointer  flex-row w-full justify-between items-center  hover:bg-holder">
          <div
            className={cn(
              "py-1 px-2  cursor-pointer text-md flex flex-row gap-1 items-center",
              className,
            )}
          >
            {title}
          </div>

          <div className="  text-md cursor-pointer opacity-50 text-label rounded-md items-center justify-center flex h-5 w-5">
            <AppIcon icon="bi:chevron-right" className="h-3 w-3" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="flex w-48 !p-0 flex-col z-[100]  max-h-72 overflow-y-auto"
        collisionPadding={0}
        sideOffset={10}
      >
        {list.length > 6 && (
          <div
            className="sticky p-1 bg-popover top-0 z-[100]  border-b"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <input
              value={search}
              type="text"
              className="w-full bg-holder-lighter py-1 px-2 pe-8 outline-none border border-muted-dark rounded-md"
              placeholder="Search..."
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <AppIcon
              icon="lucide:search"
              className="absolute text-label-light top-[50%] translate-y-[-50%] end-4 w-4 "
            />
          </div>
        )}

        <div className="w-full col p-1">
          {list.map(item => (
            <div
              key={item.value}
              onClick={e => {
                if (setSelected) setSelected(item.value);
                if (onChange) onChange(item.value);
                setOpen(false);
                e.preventDefault();
                e.stopPropagation();
              }}
              className={
                "py-1 px-2 group cursor-pointer hover:bg-holder-dark rounded-sm" +
                (!item.title.toLowerCase().includes(search.toLowerCase()) &&
                search !== ""
                  ? " hidden "
                  : "")
              }
            >
              <div className="flex   flex-row w-full justify-between items-center">
                <div className=" text-md flex flex-row gap-1 items-center ">
                  {item.title}
                </div>

                {selected && item.value === selected && (
                  <div className="text-md cursor-pointer  rounded-md items-center justify-center flex h-5 w-5">
                    <AppIcon icon="material-symbols:check" width={18} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
