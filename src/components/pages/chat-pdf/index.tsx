"use client";

import { useMediaQuery } from "usehooks-ts";

import MainChatPdfComponent from "@/components/pages/chat-pdf/componets/MainChatPdfComponent";
import { SetSearchParamProvider } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import type { SCRPropsType } from "@/services/types";

export default function ChatWithPdf({ params, searchParams }: SCRPropsType) {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const {
    page: { pdf: lang },
  } = useGetDictionary();
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chatpdf">
      <div className="max-h-apps-page flex h-full w-full overflow-hidden bg-holder-lighter p-0 ">
        {!isMobile && (
          <div className="w-full    ">
            <MainChatPdfComponent params={params} searchParams={searchParams} />
          </div>
        )}
        {isMobile && (
          <div className="w-full h-full  flex items-center justify-center    ">
            <div className="flex flex-col items-center justify-center gap-10">
              <div className=" text-1xl  lg:text-4xl font-bold">
                {lang.chat_with_any}
                <span className="ml-2 inline-block w-fit -rotate-[2deg] bg-[#9373EE] px-2 text-white">
                  <p className="rotate-[2deg] text-1xl  lg:text-4xl font-bold my-5">
                    {" "}
                    {lang.pdf_document}
                  </p>
                </span>
              </div>
              <p className="mx-[15%] w-auto text-center text-md text-[#747474]">
                {lang.meesage_mobile_size}
              </p>
            </div>
          </div>
        )}
      </div>
    </SetSearchParamProvider>
  );
}
