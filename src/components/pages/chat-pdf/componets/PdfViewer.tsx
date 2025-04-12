"use client";

import React, { useEffect, useRef, useState } from "react";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import DocumentHeaderSection from "@/components/pages/chat-pdf/componets/DocumentHeaderSection";
import DocumentMainPages from "@/components/pages/chat-pdf/componets/DocumentMainPages";
import DocumentThumbnailSection from "@/components/pages/chat-pdf/componets/DocumentThumbnailSection";
import useCropPdf from "@/components/pages/chat-pdf/hooks/useCropPdf";

import { options, zoomOptions } from "../constants";
import useResize from "../hooks/useResize";
import { type typePdfViewer } from "../types";

import "./PdfViewer.css";

if (!pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}

const PdfViewer = React.memo(
  ({
    file,
    isDragging,
    addFile,
    setIsFullScreen,
    isFullScreen,
    handleMouseUp,
    cropData,
    showConfirmModal,
    setCropData,
    isCropping,
    setShowConfirmModal,
    setIsCropping,
  }: typePdfViewer) => {
    // const [file, setFile] = useState<PDFFile[]>([]);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();
    const [showThumbnail, setShowThumbnail] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [optionSelected, setOptionSelected] = useState<{
      id: string;
      image: string;
      value: string;
    }>(zoomOptions[0]);
    const [zoom, setZoom] = useState(1.0); // Initial zoom level

    //refs
    const pageRefs = useRef<Array<HTMLDivElement>>([]);
    const documentRef = useRef<HTMLDivElement | null>(null);
    const parentDocumentRef = useRef<HTMLDivElement | null>(null);
    const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const confirmDivRef = useRef<HTMLDivElement>(null);

    const { changeScale, onResizeHandle } = useResize({
      info: optionSelected,
      parentDocumentRef,
      zoom,
      setZoom,
      setContainerWidth,
      isDragging,
      showThumbnail,
    });

    //using crop hook
    const {
      handleMouseDown,
      handleMouseMove,
      setIsCropActive,
      isCropActive,
      handleConfirmOcr,
      handleCancelOcr,
      cropIsLoading,
    } = useCropPdf({
      containerRef: documentRef,
      scrollDocumentRef: parentDocumentRef,
      addFile,
      setShowConfirmModal,
      cropData,
      setCropData,
      isCropping,
      showConfirmModal,
      setIsCropping,
    });

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handlePrint = async () => {
      try {
        const response = await fetch(file);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        if (iframeRef.current) {
          iframeRef.current.src = blobUrl;
          iframeRef.current.onload = () => {
            iframeRef.current?.contentWindow?.print();
          };
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    //handle click outside the confirmation div
    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (
          confirmDivRef.current &&
          !confirmDivRef.current.contains(event.target as Node) &&
          !cropIsLoading
        ) {
          handleCancelOcr();
        }
      };

      document.addEventListener("mousedown", handleClick);

      // Cleanup function to remove event listener
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [confirmDivRef, cropIsLoading]);

    //scroll the thumbnail into view if its
    useEffect(() => {
      // Force reflow and delay the scroll to ensure the element is in view
      setTimeout(() => {
        const currentThumbnail = thumbnailRefs.current[currentPage - 1];
        if (currentThumbnail) {
          currentThumbnail.scrollIntoView({
            behavior: "instant",
            block: "center",
          });
        }
      }, 0);
    }, [currentPage]);

    function onDocumentLoadSuccess({
      numPages: nextNumPages,
    }: PDFDocumentProxy): void {
      setNumPages(nextNumPages);
      pageRefs.current = new Array(nextNumPages).fill(null);

      onResizeHandle({
        info: optionSelected,
      });
    }

    function handleThumbnailClick(pageNumber: number): void {
      setCurrentPage(pageNumber);
      const pageRef = pageRefs.current[pageNumber - 1];
      if (pageRef) {
        pageRef.scrollIntoView({ behavior: "instant" });
      }
    }

    // Debounce utility
    const debounce = (func: (...args: any[]) => void, wait: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    return (
      <div className="w-full max-w-full  flex flex-row  h-full">
        <iframe ref={iframeRef} style={{ display: "none" }} title="PDF Print" />
        <div className="w-full max-w-full flex flex-col relative  bg-[#F8F8FB] items-center overflow-hidden">
          {numPages && numPages > 0 && (
            <DocumentHeaderSection
              showThumbnail={showThumbnail}
              file={file}
              currentPage={currentPage}
              numPages={numPages}
              handleThumbnailClick={handleThumbnailClick}
              isCropActive={isCropActive}
              handlePrint={handlePrint}
              setIsCropActive={setIsCropActive}
              optionSelected={optionSelected}
              setOptionSelected={setOptionSelected}
              setIsFullScreen={setIsFullScreen}
              setShowThumbnail={setShowThumbnail}
              zoomOptions={zoomOptions}
              changeScale={changeScale}
            />
          )}
          <div className="w-full px-4 flex max-h-screen flex-row gap-2 overflow-hidden">
            {/*thumbnail section*/}
            <DocumentThumbnailSection
              handleThumbnailClick={handleThumbnailClick}
              options={options}
              file={file}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              numPages={numPages}
              currentPage={currentPage}
              showThumbnail={showThumbnail}
              thumbnailRefs={thumbnailRefs}
            />
            {/*thumbnail section*/}
            {/*pdf pages scetion*/}

            <DocumentMainPages
              parentDocumentRef={parentDocumentRef}
              documentRef={documentRef}
              numPages={numPages}
              pageRefs={pageRefs}
              file={file}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              options={options}
              showConfirmModal={showConfirmModal}
              confirmDivRef={confirmDivRef}
              isDragging={isDragging}
              containerWidth={containerWidth}
              cropData={cropData}
              cropIsLoading={cropIsLoading}
              handleCancelOcr={handleCancelOcr}
              handleConfirmOcr={handleConfirmOcr}
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              zoom={zoom}
              isCropActive={isCropActive}
              isFullScreen={isFullScreen}
              setCurrentPage={setCurrentPage}
            />
            {/*pdf pages scetion*/}
          </div>
        </div>
      </div>
    );
  },
);

PdfViewer.displayName = "PdfViewer";
export default PdfViewer;
