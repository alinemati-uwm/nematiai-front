import React from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import LoadingDots from "@/components/ui/LoadingDots";
import { useGetDictionary } from "@/hooks";

// Loading page component
export default function LoadingPage() {
  const { common: lang } = useGetDictionary();

  return (
    <div className="flex w-full max-w-[760px] fixed overflow-hidden  flex-col items-center justify-center gap-20 ">
      <Dialog open={true}>
        <DialogContent className=" w-[200px] h-[100px] flex justify-center col items-center  overflow-hidden outline-none  ">
          <VisuallyHidden>
            <DialogTitle>Page Loading</DialogTitle>
          </VisuallyHidden>
          <div className="">
            <LoadingDots />
          </div>
          <label className="text-small text-label-light">{lang.loading}</label>
        </DialogContent>
      </Dialog>
    </div>
  );
}
