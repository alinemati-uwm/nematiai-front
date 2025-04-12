import React from "react";

import { useEditorState } from "@udecode/plate-common/react";

import useAiOptionStorage from "@/components/editor/editor-custom/AiOptions/useAiOptionStorage";
import type { AIAction } from "@/components/editor/editor-custom/types";
import AppIcon from "@/components/shared/AppIcon";
import useDraggComponent from "@/hooks/useDraggComponent";
import { useGetDictionary } from "@/hooks";

import AiOptionMenuItemList from "./AiOptionMenuItemList";
import { AiOptionPlugin } from "./AiOptionPlugin";

export function AiOptionMenu() {
  const editor = useEditorState();
  const { aiActionsList, setSelectedAction, setPin, setSelectedOption } =
    useAiOptionStorage();
  const {
    components: { editor: dictionary },
  } = useGetDictionary();

  const { showMenu, initialPosition } = editor.useOptions(
    AiOptionPlugin,
    options => ({
      showMenu: options.showMenu,
      initialPosition: options.initialPosition,
    }),
  );

  const { onMouseDown, componentRef, position, isDragging } = useDraggComponent(
    {
      initialPosition: initialPosition,
      initialSize: { width: 180, height: 350 },
    },
  );

  const onClickAction = (item: AIAction) => {
    if (isDragging === false) {
      setSelectedAction(item.id);
      editor.setOptions(AiOptionPlugin, {
        showMenu: false,
        showModal: true,
      });
    }
  };

  return (
    <div
      onClick={() => {
        if (isDragging === false)
          editor.setOptions(AiOptionPlugin, {
            showMenu: false,
          });
      }}
      className={` fixed top-0 left-0 w-full h-full z-[100]  ${showMenu ? "" : "hidden"}`}
    >
      <div
        ref={componentRef}
        className=" fixed p-1 top-0 left-0 z-[100] shadow-lg border rounded bg-popover max-h-80 w-44"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          overflowY: "auto",
        }}
        onMouseDown={e => {
          onMouseDown(e);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {aiActionsList
          .sort(a => (a.isPin ? -1 : 1))
          .map(item => (
            <div
              key={item.id}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onClickAction(item);
              }}
              className="py-1 px-2 group cursor-pointer hover:bg-holder rounded-sm"
            >
              <div className="flex  flex-row w-full justify-between items-center">
                <div className="text-md flex flex-row gap-2 items-center">
                  <AppIcon icon={item.icon} width={18} />
                  {dictionary[item.titleI18n] || item.title}
                </div>

                <div
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPin(item.id, !item.isPin);
                  }}
                  className={`   text-md ${item.isPin ? "" : " hidden group-hover:flex "}   cursor-pointer hover:bg-holder-lighter rounded-md items-center justify-center flex h-5 w-5`}
                >
                  <AppIcon
                    icon={item.isPin ? "bi:pin-fill" : "bi:pin-angle"}
                    width={12}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="flex flex-col border-t mt-1 pt-1">
          {aiActionsList
            .filter(item => item.options?.length > 0)
            .map(item => (
              <AiOptionMenuItemList
                key={`menu-${item.id}`}
                title={dictionary[item.settingTitleI18n!]}
                selected={item.selectedOption || item.options[0]}
                setSelected={value => {
                  setSelectedOption(item.id, value);
                  editor.setOptions(AiOptionPlugin, {
                    showMenu: false,
                    showModal: true,
                  });
                }}
                list={item.options.map(i => ({ title: i, value: i }))}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
