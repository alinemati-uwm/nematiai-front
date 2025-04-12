"use client";

import { memo, useState } from "react";

import { useMediaQuery } from "usehooks-ts";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatar } from "@/components/user";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type { EngineItem, StateSetterType } from "@/services/types";

interface IProps {
  value: string;
  setValue: (item: string) => void;
  engines: EngineItem[];
  triggerClassName?: string;
  contentClassName?: string;
  contentWidth?: number;
}
interface SelectPropsType extends IProps {
  onOpenChange: StateSetterType<boolean>;
}

/**
 * CommandSelectEngines component
 * used to render the list of engines
 * in the select component or drawer
 * @param setValue - function to set the value
 * @param value - current value
 * @param onOpenChange - function to set the open state
 * @param engines - list of engines
 * @constructor
 */
function CommandSelectEngines({
  setValue,
  value,
  onOpenChange,
  engines,
}: SelectPropsType) {
  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
  }

  const {
    components: {
      engine_select: { search_placeholder, no_result_message },
    },
  } = useGetDictionary();

  return (
    <Command>
      <CommandInput placeholder={search_placeholder} />
      <CommandList>
        <CommandEmpty>{no_result_message}</CommandEmpty>
        <CommandGroup>
          {/*list of engines*/}
          {engines.map(item => (
            <CommandItem
              key={item.id}
              value={item.id}
              onSelect={() => handleSelectItem(item.name)}
              className={cn(
                "flex cursor-pointer gap-2 px-2 text-small ",
                value !== item.id &&
                  "bg-holder-lighter aria-selected:bg-holder-lighter  ",
              )}
            >
              {/*engine image*/}
              <UserAvatar
                imageSrc={item.image}
                name={item.name}
                className="h-5 w-5"
                fallbackClassname="text-small"
              />
              {item.name}
              {/*selected check*/}
              <AppIcon
                icon="lucide:check"
                className={cn(
                  "ms-auto h-4 w-4 text-smallm",
                  item.id === value ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

/**
 * it a select popover in desktop and drawer in mobile
 * used for selecting the engine for different pages
 * get the list of engines and the current value
 * @param props
 * @constructor
 */
function EngineSelect(props: IProps) {
  const {
    components: {
      engine_select: { select_message },
    },
  } = useGetDictionary();

  const { engines, value, triggerClassName, contentClassName, contentWidth } =
    props;
  const [open, setOpen] = useState(false); // open state
  const isDesktop = useMediaQuery("(min-width: 768px)"); // check if the device is desktop render popover else drawer
  const currentValue = value
    ? engines.find(item => item.id === value)
    : engines[0]; // get the current value

  const renderTrigger = () => (
    <Button
      variant="outline"
      className={cn(
        "gird w-full grid-cols-9 gap-2 bg-muted px-2 hover:border-muted-darker hover:bg-muted-dark transition-all aria-expanded:border-primary aria-expanded:bg-holder-lighter",
        triggerClassName,
      )}
    >
      {/*engine image*/}
      <UserAvatar
        imageSrc={currentValue?.image || ""}
        name={currentValue?.name || ""}
        className="col-span-1 h-3 w-3"
        fallbackClassname="text-small"
      />
      <span className="col-span-7 w-full max-w-full overflow-hidden text-ellipsis text-start">
        {currentValue?.name || select_message}
      </span>
      <span
        data-open={open}
        className="col-span-1 ms-auto transition-all duration-200 data-[open=false]:rotate-180"
      >
        <AppIcon icon="lucide:chevron-down" className="h-4 w-4 opacity-50" />
      </span>
    </Button>
  );

  // render drawer for mobile
  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{renderTrigger()}</DrawerTrigger>
        <DrawerContent className={contentClassName}>
          <CommandSelectEngines {...props} onOpenChange={setOpen} />
        </DrawerContent>
      </Drawer>
    );

  //render popover for desktop
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
      <PopoverContent
        className={cn("p-0", contentClassName)}
        style={{ width: contentWidth ? contentWidth : "100%" }}
        align="start"
      >
        <CommandSelectEngines {...props} onOpenChange={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
export default memo(EngineSelect);
