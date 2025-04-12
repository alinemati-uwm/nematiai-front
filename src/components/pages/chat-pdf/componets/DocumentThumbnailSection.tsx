import React from "react";

import { type PDFDocumentProxy } from "pdfjs-dist";
import { Document, Thumbnail } from "react-pdf";

import { cn } from "@/lib/utils";

interface Props {
  showThumbnail: boolean;
  file: string;
  onDocumentLoadSuccess: (params: PDFDocumentProxy) => void;
  options: { cMapUrl: string; standardFontDataUrl: string };
  numPages: number | null;
  thumbnailRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  currentPage: number;
  handleThumbnailClick(pageNumber: number): void;
}

const DocumentThumbnailSection = (Props: Props) => {
  const {
    showThumbnail,
    file,
    onDocumentLoadSuccess,
    options,
    numPages,
    thumbnailRefs,
    currentPage,
    handleThumbnailClick,
  } = Props;

  return (
    <div
      className={cn(
        "sticky pt-10  top-0 left-0 w-0 bg-gray-400 justify-center flex ",
        showThumbnail && "w-[122px]",
      )}
      style={{
        maxHeight: "calc(100vh - 80px)",
        overflowY: "auto", // Ensure the container is scrollable
      }}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        <div className="flex flex-col gap-2 mx-auto">
          {Array.from(new Array(numPages), (_el, index) => (
            <div
              key={`thumbnail_${index + 1}`}
              className={cn("flex flex-col items-center gap-2 rounded-lg")}
              ref={el => {
                thumbnailRefs.current[index] = el;
              }}
            >
              <div
                className={cn(
                  "hover:bg-gray-600 rounded-md p-1 items-center justify-center",
                  index + 1 === currentPage && "bg-gray-600",
                )}
              >
                <Thumbnail
                  pageNumber={index + 1}
                  width={90}
                  onClick={() => handleThumbnailClick(index + 1)}
                  className="Thumbnail_pages"
                />
              </div>
              <div>{index + 1}</div>
            </div>
          ))}
        </div>
      </Document>
    </div>
  );
};

export default DocumentThumbnailSection;
