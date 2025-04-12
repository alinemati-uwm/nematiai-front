"use client";

import React, { useState } from "react";

import AppTypo from "@/components/ui/AppTypo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MinimalButton } from "../shared";

interface IProps {
  list: (React.ComponentProps<typeof MinimalButton> & {
    onClick: () => void;
  })[];
  icon: string;
  title: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  align?: "start" | "end" | "center";
}

/**
 * PopoverList component renders a list of items inside a popover.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.list - The list of items to be displayed in the popover.
 * @param {React.ReactNode} props.icon - The icon to be displayed on the button that triggers the popover.
 * @param {string} props.title - The title to be displayed on the button that triggers the popover.
 *
 * @returns JSX.Element The rendered PopoverList component.
 *
 * @component
 *
 * @example
 * const list = [
 *   { title: 'Item 1', onClick: () => console.log('Item 1 clicked'), disabled: false, selected: false, icon: <Icon1 />, color: 'primary' },
 *   { title: 'Item 2', onClick: () => console.log('Item 2 clicked'), disabled: true, selected: false, icon: <Icon2 />, color: 'secondary' }
 * ];
 *
 * <PopoverList list={list} icon={<SomeIcon />} title="Popover Title" />
 */
export default function PopoverList({
  list,
  icon,
  title,
  isOpen,
  setIsOpen,
  align = "center",
}: IProps) {
  const [open, setOpen] = useState(false); // for copy value

  return (
    <Popover
      open={setIsOpen ? isOpen : open}
      onOpenChange={setIsOpen ? setIsOpen : setOpen}
    >
      <PopoverTrigger>
        <MinimalButton
          selected={open}
          icon={icon}
          title={title}
          element="div"
        />
      </PopoverTrigger>

      <PopoverContent
        className="flex z-[20] w-40 flex-col !p-1  select-none"
        collisionPadding={0}
        align={align}
      >
        {list.map((item, index) => (
          <div
            key={"PopoverList_" + index}
            className="flex flex-row items-center py-1.5 rounded-md px-2 gap-2 cursor-pointer hover:bg-holder-dark"
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
              }
            }}
          >
            <MinimalButton
              size="sm"
              variant="ghost"
              disabled={item.disabled}
              selected={item.selected}
              icon={item.icon}
              color={item.color}
              className={item.selected ? "text-primary" : ""}
            />
            <AppTypo
              type="label"
              color={item.disabled ? "secondary" : "default"}
              className="cursor-pointer"
            >
              {item.title}
            </AppTypo>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
