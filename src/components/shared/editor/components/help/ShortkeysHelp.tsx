import React, { useContext, useState } from "react";

import AppIcon from "@/components/shared/AppIcon";
import ImageEditorContext from "@/components/shared/editor/context";
import useImageEditorItems from "@/components/shared/editor/hooks/useImageEditorItems";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useBreakpoint from "@/hooks/useBreakpoint";
import { checkIsMobile } from "@/lib/utils";

import useHookShapes from "../sidebar/components/items/modules/shapes/useHookShapes";

function ShortkeysHelp() {
  const [Modal, setModal] = useState(false);
  const context = useContext(ImageEditorContext);
  const menues = {
    tools: useImageEditorItems(context),
    shapes: useHookShapes(context),
  };
  const { isGreaterThan } = useBreakpoint();

  const customs = [
    ...menues.tools.items.map(el => ({
      caption: el.caption,
      description: el.shortKey.description,
    })),
    ...menues.shapes.items.map(el => ({
      caption: el.caption,
      description: el.shortKey.description,
    })),
    {
      caption: "Delete Object",
      description: "Delete",
    },
    {
      caption: "Undo",
      description: "Cntl+Z",
    },
    {
      caption: "Redo",
      description: "Cntl+Y",
    },
    {
      caption: "Close Editor",
      description: "Esc",
    },
  ];

  return checkIsMobile() ? null : (
    <>
      <div
        onClick={() => setModal(prev => !prev)}
        className={`hidden md:flex justify-center cursor-pointer items-center w-10 h-10 rounded-full bg-gray-500 text-white shadow-lg bottom-0 ${isGreaterThan("md") ? "right-0 m-8" : "left-0 m-5"} fixed`}
      >
        <AppIcon icon="bi:question-lg" width={20} />
      </div>
      <Dialog open={Modal} onOpenChange={() => setModal(false)}>
        <DialogContent className="flex flex-col max-w-auto max-w-[95%] w-[400px] gap-y-0 px-8">
          <DialogHeader className="flex flex-row justify-between items-center">
            <DialogTitle>Essential Keyboard Shortcuts</DialogTitle>
            <DialogClose>
              <AppIcon icon="gg:close-o" width={23} />
            </DialogClose>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-5 mt-4 py-4">
            {customs.map((el, key) => (
              <div key={key} className="flex flex-row gap-x-2">
                <strong>{el.caption}:</strong>
                <span>{el.description}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShortkeysHelp;
