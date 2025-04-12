import React, { useEffect, useRef, useState } from "react";

import { Document, Page } from "react-pdf";

import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/ui/LoadingDots";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import { type typeDocumentMainPages } from "../types";

const DocumentMainPages = (Props: typeDocumentMainPages) => {
  const {
    cropIsLoading,
    isFullScreen,
    isCropActive,
    file,
    onDocumentLoadSuccess,
    pageRefs,
    documentRef,
    parentDocumentRef,
    options,
    numPages,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    isDragging,
    containerWidth,
    cropData,
    showConfirmModal,
    zoom,
    handleConfirmOcr,
    handleCancelOcr,
    confirmDivRef,
    setCurrentPage,
  } = Props;

  const [pages, setPAges] = useState<number>(-1);
  const { common: lang } = useGetDictionary();

  useEffect(() => {
    if (numPages) {
      setPAges(numPages);
    }
  }, [numPages]);

  // برای ذخیره observer
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.boundingClientRect.height > 50) {
            const pageIndex = Number(entry.target.getAttribute("data-index"));
            setCurrentPage(pageIndex + 1);
          }
        });
      },
      {
        root: parentDocumentRef.current,
        threshold: 0.5,
      },
    );

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "flex-1 overflow-y-scroll border border-transparent gap-2   ",
        isCropActive && "border-blue-400 border border-dashed",
        cropIsLoading && "pointer-events-none",
        isFullScreen && "max-w-[900px] mx-auto",
      )}
      ref={parentDocumentRef}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="w-full h-[90dvh] flex  items-center justify-center overflow-y-clip text-black text-4xl">
            <div className="  flex flex-row gap-2 items-center justify-center">
              <LoadingDots></LoadingDots>
            </div>
          </div>
        }
        options={options}
      >
        <div
          className="flex flex-col gap-2 min-content  "
          style={{ position: "relative" }}
          ref={documentRef}
        >
          {pages !== -1 &&
            Array.from(new Array(pages), (_el, index) => {
              return (
                <div
                  data-index={index}
                  ref={el => {
                    if (el && pageRefs.current) {
                      pageRefs.current[index] = el;
                      observer.current?.observe(el);
                    }
                  }}
                  key={`page_${index + 1}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  style={{ position: "relative" }}
                  className={cn(
                    "Page_Container shadow-md",
                    (isCropActive || isDragging) && "no-select",
                  )}
                >
                  <Page
                    pageNumber={index + 1}
                    width={containerWidth} // Subtract margin or padding if needed
                    scale={zoom}
                  />
                </div>
              );
            })}

          {/* Global Crop Overlay */}
          {cropData && (
            <div
              style={{
                position: "absolute",
                border: "1px dashed red",
                left: `${Math.min(cropData.startX, cropData.endX)}px`,
                top: `${Math.min(cropData.startY, cropData.endY)}px`,
                width: `${Math.abs(cropData.endX - cropData.startX)}px`,
                height: `${Math.abs(cropData.endY - cropData.startY)}px`,
                pointerEvents: "none",
              }}
            ></div>
          )}
          {showConfirmModal && cropData && (
            <div
              ref={confirmDivRef}
              className="w-auto p-2 absolute h-auto bg-blue-200 flex  flex-row items-center gap-2 rounded-md  cursor-pointer "
              style={{
                left: `${Math.min(cropData.startX, cropData.endX)}px`,
                top: `${Math.min(cropData.startY, cropData.endY) + Math.abs(cropData.endY - cropData.startY)}px `,
                zIndex: 20,
              }}
            >
              <Button
                disabled={cropIsLoading}
                onClick={() => handleConfirmOcr()}
                isPending={cropIsLoading}
              >
                {lang.confirm}
              </Button>
              <Button onClick={() => handleCancelOcr()}>{lang.cancel}</Button>
            </div>
          )}
        </div>
      </Document>
    </div>
  );
};

export default DocumentMainPages;
