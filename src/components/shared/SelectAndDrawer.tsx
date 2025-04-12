"use client";

import React, { memo, useEffect, useRef, useState } from "react";

import Image from "next/image";

import RenderIf from "@/components/shared/RenderIf";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn, generateRandomKey } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type { StateSetterType } from "@/services/types";

import AppIcon from "./AppIcon";

type objectItem = Partial<Record<string, string>> & {
  id: string;
  image?: string;
  value: string;
};
type Items = objectItem | string;
interface IProps {
  value: Items;
  setValue: (item: string) => void;
  items: Items[];
  showSearch?: boolean;
  isSelect?: boolean;
  label?: string;
  buttonStyle?: string;
  itemClassName?: string;
  itemValueClassName?: string;
  placeHolder?: string;
}
interface SelectPropsType extends IProps {
  onOpenChange: StateSetterType<boolean>;
  items: objectItem[];
  value: objectItem;
}

/**
 * Component to render selectable items within a command interface.
 *
 * @param {SelectPropsType} props - The properties for the component.
 * @param {objectItem[]} props.items - The list of items to display.
 * @param {function} props.setValue - Function to set the selected value.
 * @param {objectItem} props.value - The currently selected value.
 * @param {function} props.onOpenChange - Function to handle the open state change.
 * @param {boolean} [props.showSearch=true] - Whether to show the search input.
 * @param {string} [props.itemClassName] - Additional class names for the items.
 */
function CommandSelectItems({
  items,
  setValue,
  value,
  onOpenChange,
  showSearch = true,
  itemClassName,
}: SelectPropsType) {
  /**
   * Handle the selection of an item.
   *
   * @param {string} item - The selected item.
   */
  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
  }
  const {
    page: {
      chat: { no_results_found, search },
    },
  } = useGetDictionary();
  return (
    <Command>
      <RenderIf isTrue={showSearch}>
        <CommandInput placeholder={search} />
      </RenderIf>
      <CommandList>
        <RenderIf isTrue={showSearch}>
          <CommandEmpty>{no_results_found}</CommandEmpty>
        </RenderIf>
        <CommandGroup>
          {items.map(item => (
            <CommandItem
              key={item.id}
              value={item.value}
              onSelect={v => handleSelectItem(item.id)}
              className={cn(
                "text-smallm flex-row-reverse cursor-pointer justify-between px-2",
                value.value.toLowerCase() === item.value.toLowerCase() &&
                  "bg-primary-light aria-selected:bg-primary-light",
                itemClassName,
              )}
            >
              <AppIcon
                icon="bi:check"
                className={cn(
                  "text-smallm me-2 h-4 w-4",
                  item.value.toLowerCase() === value.value.toLowerCase()
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              <div className="flex justify-start gap-2">
                {item.image && (
                  <div className="relative  h-5  w-5 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.id} fill />
                  </div>
                )}
                {item.value}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

/**
 * Component to render a select input with optional search functionality.
 *
 * @param {object} props - The properties for the component.
 * @param {objectItem[]} props.items - The list of items to display.
 * @param {function} props.setValue - Function to set the selected value.
 * @param {objectItem} props.value - The currently selected value.
 * @param {string} [props.label] - The label for the select input.
 * @param {string} [props.buttonStyle] - Additional class names for the button.
 * @param {string} [props.itemClassName] - Additional class names for the items.
 * @param {string} [props.itemValueClassName] - Additional class names for the item values.
 * @param {string} [props.placeHolder] - The placeholder text for the select input.
 */
function SelectComponent({
  items,
  setValue,
  value,
  label,
  buttonStyle,
  itemClassName,
  itemValueClassName,
  placeHolder,
}: Omit<IProps, "showSearch" | "isSelect" | "items"> & {
  items: objectItem[];
  value: objectItem;
}) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectionStart, setSelectionStart] = useState<number>(0);

  /**
   * Handle the change in the search input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    setSelectionStart(input.selectionStart ?? 0);
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFocus();
  }, [search, selectionStart]);

  /**
   * Set focus to the search input.
   */
  const setFocus = () => {
    const input = inputRef.current;
    if (input) {
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(selectionStart, selectionStart);
      }, 0);
    }
  };
  return (
    <Select
      value={value.id}
      onOpenChange={() => {
        setSearch("");
        setFocus();
      }}
      onValueChange={setValue}
      required={true}
    >
      <SelectTrigger
        className={cn("m-0 w-full text-label", buttonStyle)}
        onKeyDown={e => {
          e.stopPropagation();
        }}
      >
        <SelectValue
          placeholder={placeHolder ?? "Select an option"}
          className="!text-small"
        />
      </SelectTrigger>

      <SelectContent className="!z-[100] max-h-[40vh] h-auto overflow-auto  ">
        {items.length > 5 && (
          <div className="  sticky top-[-5px] mb-1 z-10">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-holder-lighter py-2 px-2 pe-8 outline-none border border-muted-dark rounded-md"
              placeholder="Search..."
              onChange={handleInputChange}
            />
            <AppIcon
              icon="lucide:search"
              className="absolute text-label-light  top-[50%] end-3 translate-y-[-50%]  w-4 "
            />
          </div>
        )}
        <SelectGroup
          onKeyDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="flex flex-col gap-y-1"
        >
          {label && <SelectLabel>{label}</SelectLabel>}
          {items.map(item => {
            return (
              <SelectItem
                value={item.id}
                key={"SelectItem_" + generateRandomKey()}
                className={cn(
                  !item.value.toLowerCase().includes(search.toLowerCase()) &&
                    search !== ""
                    ? " hidden "
                    : "flex-row-reverse justify-between px-2",
                  value?.value.toLowerCase() === item.id.toLowerCase() &&
                    "bg-muted-dark text-accent-foreground",
                  itemClassName,
                )}
              >
                <div
                  className={`flex justify-start gap-2 ${itemValueClassName}`}
                >
                  {item.image && (
                    <div className="relative  h-5  w-5 overflow-hidden rounded-full">
                      <Image src={item.image} alt={item.id} fill />
                    </div>
                  )}
                  {item.value}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

/**
 * Component to render a user-selectable input with a drawer or popover
 *
 * @param {IProps} props - The properties for the component.
 * @param {string} [props.buttonStyle] - Additional class names for the button.
 * @param {Items[]} props.items - The list of items to display.
 * @param {Items} props.value - The currently selected value.
 * @param {boolean} [props.isSelect=true] - Whether to use a select input.
 * @param {function} props.setValue - Function to set the selected value.
 * @param {string} [props.itemValueClassName] - Additional class names for the item values.
 * @param {string} [props.label] - The label for the select input.
 * @param {string} [props.placeHolder] - The placeholder text for the select input.
 */
function UserSelectAndDrawer(props: IProps) {
  const {
    buttonStyle,
    items: itemList,
    value: userValue,
    isSelect = true,
    setValue,
    itemValueClassName = "",
    label,
    placeHolder,
  } = props;
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const popoverButtonRef = useRef<HTMLButtonElement | null>(null);
  /**
   * Check if the items list is a list of strings.
   *
   * @param {Items[]} arr - The array to check.
   * @returns boolean - True if the array is a list of strings, false otherwise.
   */
  function isListOfString(arr: Items[]) {
    return (
      Array.isArray(arr) && arr.every(element => typeof element === "string")
    );
  }

  //////////* in this section we convert value and list of items to objectItem type///////////
  const value: objectItem =
    typeof userValue === "string"
      ? { id: userValue, value: userValue }
      : userValue;

  // if items list is strings list then convert it to objectItem[]
  const items: objectItem[] = isListOfString(itemList)
    ? (itemList.map(item => ({
        id: item,
        value: item,
        image: "",
      })) as unknown as objectItem[])
    : (itemList as unknown as objectItem[]);
  ////////////////////////////////*//////////////////////////////////////////////////

  const buttonContent = value
    ? (items.find(item => item.id.toLowerCase() === value.id.toLowerCase())
        ?.value ??
      placeHolder ??
      "Select an option")
    : (placeHolder ?? "Select an option");

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="input"
            color="input"
            className={cn("w-full justify-between px-3 py-2 ", buttonStyle)}
          >
            <div className="flex justify-start gap-2">
              {/*if image is valid then show it*/}
              {value.image && (
                <div className="relative h-5 w-5  overflow-hidden rounded-full">
                  <Image src={value.image} alt={value.value} fill />
                </div>
              )}
              {buttonContent}
            </div>
            <span
              data-open={open}
              // className="transition data-[open=false]:rotate-180"
            >
              <AppIcon icon="bi:chevron-down" className="h-4 w-4 opacity-50" />
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CommandSelectItems
              {...props}
              items={items}
              value={value}
              onOpenChange={setOpen}
              itemValueClassName={itemValueClassName}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );

  if (isSelect) {
    return (
      <SelectComponent
        setValue={setValue}
        value={value}
        items={items}
        placeHolder={placeHolder}
        label={label}
        buttonStyle={buttonStyle}
        itemValueClassName={itemValueClassName}
      />
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-8 justify-between bg-muted px-3 py-2 hover:border-primary-lighter hover:text-label aria-expanded:border-primary",
            buttonStyle,
          )}
          ref={popoverButtonRef}
        >
          <div className="flex justify-start gap-2 ">
            {/*if image is valid then show it*/}

            {!!value.image && (
              <div className="relative h-5 w-5  overflow-hidden rounded-full">
                <Image src={value.image} alt={value.value} fill />
              </div>
            )}
            {buttonContent}
          </div>
          {/*<span*/}
          {/*  data-open={open}*/}
          {/*  // className="transition data-[open=false]:rotate-180"*/}
          {/*>*/}
          <AppIcon icon="bi:chevron-down" className="h-4 w-4 opacity-50" />
          {/*</span>*/}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        style={{ width: popoverButtonRef.current?.offsetWidth }}
        align="start"
      >
        <CommandSelectItems
          {...props}
          items={items}
          value={value}
          onOpenChange={setOpen}
          itemValueClassName={itemValueClassName}
        />
      </PopoverContent>
    </Popover>
  );
}

export const SelectAndDrawer = memo(UserSelectAndDrawer);
