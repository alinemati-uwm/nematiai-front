"use client";

import React, { lazy, useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import PdfUploadSection from "@/components/pages/chat-pdf/componets/pdf-upload-section";
import { cn } from "@/lib/utils";
import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";
import type { SCRPropsType } from "@/services/types";

import useChatbot from "../../chat/hooks/useChatbot";

export interface CropData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const PdfViewer = lazy(
  () => import("@/components/pages/chat-pdf/componets/PdfViewer"),
);
const PDFViewerSideBar = dynamic(
  () =>
    import("@/components/pages/chat-pdf/componets/sidebar/pdfViewer-sidebar"),
  {
    loading: () => <HomeLoading />,
  },
);

const MainChatPdfComponent = ({ params, searchParams }: SCRPropsType) => {
  //some states to handle PDF file and some UI interactions
  const [file, setFile] = useState<string>("");
  const [sidePanelIsOpen, setSidePanelIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [chatWidth, setChatWidth] = useState(500);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [cropData, setCropData] = useState<CropData | null>(null);
  const pathname = usePathname();

  //handle moving boundary between a PDF viewer and chat section
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
    document.body.style.userSelect = "none";
  };
  const handleMouseUp = () => {
    if (isCropping || cropData) {
      setIsCropping(false);
      setShowConfirmModal(true);
    }
    setIsDragging(false);
    document.body.style.userSelect = "auto";
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const newWidth = window.innerWidth - event.clientX;
      if (
        newWidth > (sidePanelIsOpen ? 500 : 660) &&
        newWidth < window.innerWidth - 500
      ) {
        setChatWidth(newWidth);
      }
    },
    [isDragging, sidePanelIsOpen],
  );

  //change the width of the chat section if the sidebar is closed
  useEffect(() => {
    if (!sidePanelIsOpen && chatWidth < 600) setChatWidth(prev => prev + 140);
    if (sidePanelIsOpen && chatWidth > 500) setChatWidth(prev => prev - 140);
  }, [sidePanelIsOpen]);

  const aftergetDetails = ({
    data,
  }: {
    data: HistoryAPIResponse["answers"];
  }) => {
    if (data.file_urls && data.file_urls.length > 0) setFile(data.file_urls[0]);
  };

  //using chatBot hook
  const { content, addFile } = useChatbot({
    params,
    searchParams,
    app_name: "chat_pdf",
    pathStr: `${pathname}?app=chatpdf`,
    regenerate: true,
    fullwidth: false,
    firstPage: false,
    flagBtnSend: true,
    showBtnNewConversation: false,
    history: false,
    aftergetDetails: aftergetDetails,
  });

  return (
    <div
      className="w-full h-full flex flex-row gap-0 relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className={cn("w-auto h-full ", isFullScreen && " hidden ")}>
        <div
          className={cn(
            "overflow-y-hidden h-full relative gap-2 transition-all border-r border-gray-200 flex flex-col",
            sidePanelIsOpen ? "w-[250px]" : "w-20",
          )}
        >
          <PDFViewerSideBar
            sidePanelIsOpen={sidePanelIsOpen}
            setFile={setFile}
            setSidePanelIsOpen={setSidePanelIsOpen}
            showUploadModal={file.length > 0}
          />
        </div>
      </div>

      {file ? (
        <>
          <div
            className={cn(
              "flex-1 max-w-[60%] min-w-[40%] h-full ",
              isFullScreen && "max-w-full",
            )}
          >
            <PdfViewer
              key={file}
              file={file}
              isDragging={isDragging}
              addFile={addFile}
              setIsFullScreen={setIsFullScreen}
              isFullScreen={isFullScreen}
              sidePanelIsOpen={sidePanelIsOpen}
              handleMouseUp={handleMouseUp}
              cropData={cropData}
              setCropData={setCropData}
              isCropping={isCropping}
              setIsCropping={setIsCropping}
              showConfirmModal={showConfirmModal}
              setShowConfirmModal={setShowConfirmModal}
            />
          </div>

          <div
            className="flex flex-row h-full sticky top-0"
            style={{ width: !isFullScreen ? `${chatWidth}px` : "0px" }}
          >
            <div
              className="w-1 cursor-e-resize min-h-full bg-gray-400"
              onMouseDown={handleMouseDown}
            ></div>

            {content}
          </div>
        </>
      ) : (
        <div className="flex-1 h-full items-center justify-center">
          <PdfUploadSection setFile={setFile} />
        </div>
      )}
    </div>
  );
};

export default MainChatPdfComponent;
