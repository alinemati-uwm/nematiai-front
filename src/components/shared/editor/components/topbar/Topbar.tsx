import React, { useContext } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";

import ImageEditorContext from "../../context";
import ImageEditorCard from "../Card";
import ImageEditorBack from "./components/Back";
import ImageEditorZoom from "./components/components/Zoom";
import ImageEditorDownload from "./components/download/Download";
import ImageEditorHistory from "./components/history/History";
import ImageEditorOptions from "./components/options/ImageEditorOptions";

function ImageEditorTopbar() {
  const { breakpoint } = useBreakpoint();
  const { canvas } = useContext(ImageEditorContext);

  return (
    <ImageEditorCard
      props={{
        className:
          "w-full justify-between relative z-20 flex flex-row gap-x-8 items-center items-center px-4 sm:px-6 h-12 rounded-t-none",
      }}
    >
      <div className="flex flex-row items-center whitespace-nowrap gap-x-3 md:gap-x-8 w-3/12">
        <ImageEditorBack />
        <ImageEditorOptions />
      </div>
      <div
        className={`flex flex-row items-center justify-center px-8 gap-x-3 md:gap-x-8 w-6/12 ${canvas ? "" : "pointer-events-none opacity-70"}`}
      >
        {breakpoint !== "xs" ? (
          <div className="flex flex-row items-center border-r border-gray-300 pr-7">
            <ImageEditorHistory />
          </div>
        ) : null}
        <ImageEditorZoom />
        {breakpoint !== "xs" ? <ImageEditorDownload /> : null}
      </div>
      <div className="flex flex-row items-center w-3/12 justify-end">
        {breakpoint === "xs" ? <ImageEditorDownload /> : null}
      </div>
    </ImageEditorCard>
  );
}

export default ImageEditorTopbar;
