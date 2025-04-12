"use client";

import React, { useEffect, useState } from "react";

import { useCodeBlockComboboxState } from "@udecode/plate-code-block/react";
import { setNodes } from "@udecode/plate-common";
import { findNodePath, useEditorState } from "@udecode/plate-common/react";

import { Button } from "@/components/plate-ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/plate-ui/popover";
import AppIcon from "@/components/shared/AppIcon";
import RenderIf from "@/components/shared/RenderIf";
import { Switch } from "@/components/ui/switch";
import { useGetDictionary } from "@/hooks";
import { type StateSetterType } from "@/services/types";

type TypeOptions = "code" | "prev" | "split" | "";
interface IProps {
  activePanZoom: boolean;
  setActivePanZoom: StateSetterType<boolean>;
}

export function CodeBlockDisplayOption({
  activePanZoom,
  setActivePanZoom,
}: IProps) {
  const state = useCodeBlockComboboxState();
  const {
    components: { editor: lang },
  } = useGetDictionary();

  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState<TypeOptions>("");
  const [rough, setRough] = useState(false);

  const editor = useEditorState();

  useEffect(() => {
    setOptions((state.element.typeOption as TypeOptions) || "code");
    setRough(!!state.element.rough);
  }, [state]);

  if (state.readOnly) return null;

  const changeDisplayOption = (value: TypeOptions) => {
    const path = findNodePath(editor, state.element);
    setNodes(editor, { typeOption: value }, { at: path });
    setOptions(value);
    setOpen(false);
  };

  const onChangeRough = (val: boolean) => {
    const path = findNodePath(editor, state.element);
    setRough(val);
    setNodes(editor, { rough: val ? val : undefined }, { at: path });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="xs"
          variant="ghost"
          className=" justify-between text-xs ا rounded p-2 hover:{} "
          aria-expanded={open}
          role="combobox"
        >
          <div className="flex flex-row hover:text-primary">
            <AppIcon icon="fluent:options-16-regular" />
            <AppIcon icon="mdi:keyboard-arrow-down" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] !p-0">
        <div className=" p-3 flex gap-2 flex-col">
          <div>
            <label className="text-medium font-bold">
              {lang.display_options}
            </label>
          </div>
          {[
            ["code", "material-symbols-light:code"],
            ["prev", "material-symbols:graph-1"],
            ["split", "fluent:split-horizontal-32-regular"],
          ].map(([label, icon], index) => (
            <div
              key={"eachoption_" + index}
              data-disabled={
                state.value !== "mermaid" && label !== "code" ? true : undefined
              }
              className=" text-medium normal flex flex-row items-center data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <div className="h-[18px] w-[18px] ">
                {options === label && (
                  <AppIcon icon="ic:round-check" fontSize={18} className="" />
                )}
              </div>
              <div
                onClick={() => changeDisplayOption(label as TypeOptions)}
                className="flex-1 flex flex-row items-center hover:text-primary cursor-pointer"
              >
                <div className="p-2">
                  <AppIcon icon={icon} fontSize={18} className="" />
                </div>

                {lang[label as keyof typeof lang]}
              </div>
            </div>
          ))}
          <RenderIf isTrue={state.element.lang === "mermaid"}>
            <div className="col mt-2 pt-2 border-t gap-2">
              <div className="row justify-between">
                <p>{lang.rough}</p>
                <Switch checked={rough} onCheckedChange={onChangeRough} />
              </div>
              <div className="row justify-between">
                <p>{lang.panZoom}</p>
                <Switch
                  checked={activePanZoom}
                  onCheckedChange={val => {
                    setActivePanZoom(val);
                    setOpen(false);
                  }}
                />
              </div>
            </div>
          </RenderIf>
        </div>
      </PopoverContent>
    </Popover>
  );
}
