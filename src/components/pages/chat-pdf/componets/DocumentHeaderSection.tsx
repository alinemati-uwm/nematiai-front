import React from "react";

import { MinimalButton, SelectAndDrawer } from "@/components/shared";
import AppIcon from "@/components/shared/AppIcon";
import { cn } from "@/lib/utils";

import { type typeDocumentHeaderSection } from "../types";

const DocumentHeaderSection = (Props: typeDocumentHeaderSection) => {
  const {
    setShowThumbnail,
    showThumbnail,
    setIsCropActive,
    currentPage,
    handleThumbnailClick,
    isCropActive,
    numPages,
    optionSelected,
    zoomOptions,
    setOptionSelected,
    file,
    handlePrint,
    setIsFullScreen,
    changeScale,
  } = Props;

  return (
    <header className="flex   justify-between bg-[#EFEFEF] px-4 py-1.5 w-full text-white">
      <div className="flex w-full items-center justify-between flex-row gap-2">
        <div className="flex  items-center gap-2 w-[182px]">
          <div
            onClick={() => setShowThumbnail(prev => !prev)}
            className={cn(
              "w-6 h-6 flex items-center justify-center rounded-sm cursor-pointer",
              showThumbnail ? "bg-gray-200" : "bg-white",
            )}
          >
            <MinimalButton
              icon="lucide:sidebar"
              className="hover:bg-white!"
              title="thumbnail"
            />
          </div>

          <div
            onClick={() => setIsCropActive(prev => !prev)}
            className={cn(
              "w-6 h-6 flex items-center justify-center rounded-sm cursor-pointer",
              isCropActive ? "bg-gray-200" : "bg-white",
            )}
          >
            <MinimalButton
              icon="ion:crop-outline"
              className="hover:bg-white!"
              title="crop"
            />
            {/*<IoCropOutline className="text-label-light" />*/}
          </div>
        </div>

        <div className="flex  flex-row flex-1 justify-center gap-2 z-8">
          <div
            onClick={() => {
              if (currentPage > 1) {
                handleThumbnailClick(currentPage - 1);
              }
            }}
            className=" flex cursor-pointer hover:bg-gray-200 transition-all items-center bg-white rounded-md text-black justify-center w-6 h-6"
          >
            <AppIcon icon="mdi:chevron-left" />
          </div>
          <div className="text-black whitespace-nowrap">
            {currentPage} / {numPages}
          </div>
          <div
            onClick={() => {
              if (numPages && currentPage < numPages) {
                handleThumbnailClick(currentPage + 1);
              }
            }}
            className=" flex items-center cursor-pointer hover:bg-gray-200 transition-all bg-white text-black rounded-md justify-center w-6 h-6"
          >
            <AppIcon icon="mdi:chevron-right" />
          </div>
        </div>

        <div className="flex flex-row gap-3 whitespace-nowrap  justify-end  items-center">
          <SelectAndDrawer
            value={optionSelected}
            setValue={val => {
              const selectedOption = zoomOptions.filter(
                item => item.id === val,
              );
              selectedOption.length > 0 && setOptionSelected(selectedOption[0]);

              changeScale({
                info: selectedOption[0],
              });
            }}
            items={zoomOptions}
            buttonStyle=" bg-white max-h-8 w-[110px]"
          />
          <div
            onClick={() => handlePrint(file)}
            className={cn(
              "w-6 h-6 p-1 bg-white flex items-center justify-center rounded-sm cursor-pointer",
            )}
          >
            <MinimalButton
              icon="mdi:printer-outline"
              className="hover:bg-white!"
              title="print"
            />
          </div>

          <div
            onClick={() => {
              setIsFullScreen((prev: boolean) => !prev);
            }}
            className={cn(
              "w-6 h-6 p-1 bg-white flex items-center justify-center rounded-sm cursor-pointer",
            )}
          >
            <MinimalButton
              icon="ion:expand"
              className="hover:bg-white!"
              title="full screen"
            />
          </div>
        </div>
        {/*<button onClick={handleSaveStackedImage}>Save Stacked Image</button>*/}
      </div>
    </header>
  );
};

export default DocumentHeaderSection;
