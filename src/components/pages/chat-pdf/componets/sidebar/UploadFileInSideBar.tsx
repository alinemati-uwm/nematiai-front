import React from "react";

import Image from "next/image";

import useHandleUpload from "@/components/pages/chat-pdf/hooks/useHandleUpload";
import { useGetDictionary } from "@/hooks";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<string>>;
  showUploadModal: boolean;
  sidePanelIsOpen: boolean;
}

const UploadFileInSideBar = ({
  setFile,
  showUploadModal,
  sidePanelIsOpen,
}: Props) => {
  //handle upload pdf hook
  const { input, showUpload, holderDropWithChild } = useHandleUpload({
    setFile,
  });
  const {
    page: { pdf: lang },
  } = useGetDictionary();
  const content = holderDropWithChild
    ? holderDropWithChild({
        className: ` transition-color flex w-full cursor-pointer
		flex-col items-center justify-center rounded border-2 p-5
		border-dashed border-[#9373EE] muted-foreground-light
		hover:border-blue-500 hover:text-blue-500 h-full`,
        child: (
          <>
            {sidePanelIsOpen ? (
              <div className="flex w-full cursor-pointer flex-col items-center justify-center m-auto">
                <Image
                  src="/images/semantic/mobile-upload.svg"
                  alt="mobile-upload"
                  width={152}
                  height={152}
                  className="h-16"
                />
                <div className="text-small m-0">{lang.new_chat_pdf}</div>
                <div className="text-small  text-label-light">
                  (PDF Document / 5MB & 10Doc Max)
                </div>
              </div>
            ) : (
              <Image
                src="/images/semantic/upload-mini.svg"
                height={34}
                width={34}
                className="!w-10 !h-10 mx-auto cursor-pointer"
                layout="responsive"
                quality={100}
                alt="image"
                onClick={() => showUpload()}
              />
            )}
          </>
        ),
      })
    : null;
  return (
    showUploadModal && (
      <div className={`mx-2  ${sidePanelIsOpen ? " h-[135px] " : ""} `}>
        <div className="flex flex-col h-full">
          <div className="w-full h-full max-h-full flex flex-col items-center justify-center">
            <div className="w-full cursor-pointer h-full">
              {content}
              <div className="w-full  ">{input}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UploadFileInSideBar;
