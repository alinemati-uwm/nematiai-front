"use client";

import React, { useRef } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import EditableDiv from "@/components/ui/InputDiv";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

// Reusable EditableDialog component
interface EditableDialogProps {
  open: boolean;
  content: React.ReactElement<any>;
  setOpen: (val: boolean) => void;
}

const EditableDialog: React.FC<EditableDialogProps> = ({
  open,
  setOpen,
  content,
}) => {
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value

  const CopyWithStyles = async () => {
    const text = editableDivRef.current?.innerText;
    handleCopy(text ? text : "");
  };

  const { common } = useGetDictionary();

  const editableDivRef = useRef<HTMLDivElement>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        title={common.copy}
        className="flex z-[100] w-[100%] col h-[500px] max-h-[100%] max-w-[100%] sm:max-h-[calc(100%-40px)]  sm:w-[95%] sm:max-w-[768px]  lg:w-[768px] gap-0  outline-none"
      >
        <VisuallyHidden>
          <DialogTitle>Edit and copy</DialogTitle>
        </VisuallyHidden>
        <div className="over rounded max-h-[calc(100%-100px)] p-3 h-full w-full">
          <EditableDiv divRef={editableDivRef} initialValue={content} />
        </div>
        <div className="flex pt-3 items-center gap-2 justify-end flex-1">
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
            title={common.close}
          >
            {common.close}
          </Button>
          <Button onClick={CopyWithStyles} className="w-16">
            {isCopied ? common.copied : common.copy}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditableDialog;
