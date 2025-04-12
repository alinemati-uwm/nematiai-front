"use client";

import React from "react";

import Image from "next/image";

import ChatPdfContent from "@/components/pages/chat-pdf/ChatPdfContent";
import useHandleUpload from "@/components/pages/chat-pdf/hooks/useHandleUpload";
import { useGetDictionary } from "@/hooks";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<string>>;
}

const PdfUploadSection = ({ setFile }: Props) => {
  //handle upload pdf hook
  const { input, holderDropWithChild } = useHandleUpload({ setFile });
  const {
    page: { pdf: lang },
  } = useGetDictionary();

  const content = holderDropWithChild
    ? holderDropWithChild({
        className: ` transition-color flex w-8/12 cursor-pointer
					flex-col items-center justify-center rounded border-2 p-5
					border-dashed border-[#9373EE] text-label-light
					hover:border-blue-500 hover:text-blue-500 `,
        child: (
          <div className="flex w-8/12 cursor-pointer flex-col items-center justify-center m-auto">
            <Image
              src="/images/semantic/mobile-upload.svg"
              alt="mobile-upload"
              width={152}
              height={152}
            />
            <div className="text-2xl m-0">{lang.select_pdf}</div>
            <div>(PDF Document / 5MB & 10Doc Max)</div>
          </div>
        ),
      })
    : null;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      {content}

      <ChatPdfContent />

      <div className="w-full  ">{input}</div>
    </div>
  );
};

export default PdfUploadSection;
