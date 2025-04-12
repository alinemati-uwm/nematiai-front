"use client";

import { useEffect, useState } from "react";

import { type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { ToolbarButton } from "@radix-ui/react-toolbar";
import { collapseSelection, getMarks, setMarks } from "@udecode/plate-common";
import { useEditorState } from "@udecode/plate-common/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "@/components/plate-ui/dropdown-menu";
import { useEditorStore } from "@/stores/zustand/editor-slice";

const items = {
  sans: "var(--font-sans)",
  serif: "componets-serif, Georgia, Cambria, Times New Roman, Times, serif",
  mono: "componets-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
} as const;

type ItemsType = typeof items;
type ItemsKey = keyof ItemsType;
type ItemsValue = ItemsType[ItemsKey];

export function FontFamilyButton(props: DropdownMenuProps) {
  const [value, setValue] = useState<ItemsValue>("var(--font-sans)");

  const isEditorChange = useEditorStore.use.isEditorChange();
  const editor = useEditorState();
  const openState = useOpenState();

  const item = Object.entries(items).find(
    ([key, itemValue]) => itemValue === value,
  ) ?? ["sans", "var(--font-sans)"];

  useEffect(() => {
    let mount = true;

    if (mount) {
      const marks = getMarks(editor);
      if (marks?.fontFamily) {
        setValue(marks.fontFamily as ItemsValue);
      } else {
        setValue("var(--font-sans)");
      }
    }

    return () => {
      mount = false;
    };
  }, [editor, isEditorChange]);

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton title="Font Family" className="text-nowrap capitalize ">
          {item[0]}
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuLabel>Font Family</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={value => {
            setValue(value as ItemsValue);
            setMarks(editor, { fontFamily: value });
            collapseSelection(editor);
          }}
        >
          {Object.entries(items).map(([key, itemValue]) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className="min-w-[180px] text-nowrap capitalize"
            >
              {key}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
