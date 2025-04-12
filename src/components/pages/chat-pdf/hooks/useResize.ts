"use client";

import { useEffect, type Dispatch, type SetStateAction } from "react";

import { type typeOnchangeScale } from "../types";

const useResize = ({
  info,
  setZoom,
  parentDocumentRef,
  setContainerWidth,
  zoom,
  isDragging,
  showThumbnail,
}: typeOnchangeScale & {
  showThumbnail: boolean;
  isDragging: boolean;
  zoom: number;
  setContainerWidth: Dispatch<SetStateAction<number | undefined>>;
}) => {
  // Set the container width on initial render, on resize, and when thumbnail changes
  useEffect(() => {
    const updateContainerWidth = () => {
      onResizeHandle({
        info: info,
      });
    };

    // Initial set
    updateContainerWidth();

    // Update on resize
    window.addEventListener("resize", updateContainerWidth);

    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [isDragging, showThumbnail]);

  const changeScale = ({ info }: Pick<typeOnchangeScale, "info">) => {
    const ValueOfScaleBaseOnId = {
      "3": 0.25,
      "4": 0.5,
      "5": 1,
      "6": 2,
      "7": 4,
    };

    switch (info.id) {
      case "1": {
        setZoom(1);
        break;
      }
      case "2": {
        const containerHeight = parentDocumentRef.current?.offsetHeight || 0;

        const onePage = document
          .getElementsByClassName("Page_Container")[0]
          .getBoundingClientRect();
        const pageHeight = onePage.height;
        setZoom((zoom * containerHeight) / pageHeight);

        break;
      }
      default: {
        setZoom(
          ValueOfScaleBaseOnId[info.id as keyof typeof ValueOfScaleBaseOnId],
        );
      }
    }
  };

  const onResizeHandle = ({ info }: Pick<typeOnchangeScale, "info">) => {
    if (parentDocumentRef.current) {
      setContainerWidth(parentDocumentRef.current.clientWidth);
    }
  };

  return {
    changeScale,
    onResizeHandle,
  };
};

export default useResize;
