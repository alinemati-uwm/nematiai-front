"use client";

import type React from "react";

import { useReactToPrint } from "react-to-print";

import { convertInnerHtmlToDocx } from "@/lib/convertInnerHtmlToDocx";

type elType = React.RefObject<HTMLElement | null>;

/**
 * Custom hook to handle downloading content as PDF or DOCX.
 * Used in the editor to download the content of the editor as a PDF or DOCX file.
 *
 * This hook provides functions to download the content of a referenced HTML element as a PDF or DOCX file.
 *
 * @param {React.MutableRefObject<HTMLElement | null>} elementRef - The reference to the target HTML element.
 * @returns Object - An object containing the handleDownloadPdf and handleDownloadDocx functions.
 * @returns function handleDownloadPdf - Function to download the content as a PDF.
 * @returns function handleDownloadDocx - Function to download the content as a DOCX.
 */
export function useDownLoadHandler(elementRef: elType) {
  /**
   * Function to handle downloading the content as a PDF.
   */
  const handleDownloadPdf = useReactToPrint({
    contentRef: elementRef,
    // Add classes to the body for printing
    bodyClass: "print:!h-fit print:!overflow-visible print:!font-sans",
    pageStyle: `
		@page { 
		  margin: 1in !important; 
		}
  
		@media print {
		  /* Only affects printing */
		  .printEditor {
			padding: 0px!important;
		  }
		}
	  `,
    onBeforePrint: async () => {
      if (elementRef.current) {
        elementRef.current.classList.add("printEditor");
      }
    },
  });

  /**
   * Function to handle downloading the content as a DOCX.
   *
   * @param {React.MutableRefObject<HTMLElement | null>} [el] - Optional reference to a different HTML element.
   */
  const handleDownloadDocx = async (el?: elType) => {
    const htmlValue = el?.current ?? elementRef.current;
    if (htmlValue) {
      const source = convertInnerHtmlToDocx(htmlValue.innerHTML);

      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "document.doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }
  };
  return { handleDownloadPdf, handleDownloadDocx };
}
