import React from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import LoadingDots from "@/components/ui/LoadingDots";
import { useGetDictionary } from "@/hooks";

export default function LoadingChat() {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();

  return (
    <div className="flex fixed w-full max-w-[760px] overflow-hidden flex-col items-center justify-center gap-20 ">
      <Dialog open={true}>
        <DialogContent className=" w-[200px] h-[100px] flex justify-center col items-center  overflow-hidden outline-none  ">
          <VisuallyHidden>
            <DialogTitle>Chat Loading</DialogTitle>
          </VisuallyHidden>
          <div className="">
            <LoadingDots></LoadingDots>
          </div>
          <label className="text-small text-label-light">
            {chatDictionary.loading_Chat}
          </label>
        </DialogContent>
      </Dialog>
    </div>
  );
}
