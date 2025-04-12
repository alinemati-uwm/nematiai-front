import React, { useEffect, useState } from "react";

import { colorPalettes } from "@/components/pages/mind-map/constants";
import MindMapPreviewFooter from "@/components/pages/mind-map/mind-map-preview/mind-map-preview-footer";
import MindMapPreviewHeader from "@/components/pages/mind-map/mind-map-preview/mind-map-preview-header";
import MindMapPreviewRenderer from "@/components/pages/mind-map/mind-map-preview/mind-map-preview-renderer";
import type { Div } from "@/components/pages/mind-map/types";
import { useMarkmap } from "@/components/pages/mind-map/useMarkmap";
import { Show } from "@/components/shared";
import LoadingDots from "@/components/ui/LoadingDots";
import { cn } from "@/lib/utils";

interface IProps extends Div {
  value: string;
  documentName: string;
  onClose: () => void;
  isFullScreen?: boolean;
  setIsFullScreen?: (isFullScreen: boolean) => void;
  isLoading?: boolean;
  openEditor?: () => void;
  fitDependencies?: any[];
  setValue?: (value: string) => void;
}

function MindMapPreview({
  className,
  value,
  documentName,
  setIsFullScreen,
  onClose,
  isFullScreen,
  isLoading,
  openEditor,
  fitDependencies = [],
  setValue = () => {},
  ...otherProps
}: IProps) {
  const [language, setLanguage] = useState("en-us");
  const {
    svgRef,
    rescale,
    handleDownload,
    setColors,
    nodeMenuPosition,
    toggleExpand,
    backToFirstNode,
    addNode,
    deleteNode,
    setPath,
    editNode,
    selectedPath,
    activeColor,
    setActiveColor,
    setUseSolidColor,
    useSolidColor,
    addedPath,
    setAddedPath,
    setNodeToClipboard,
    changeLinkShape,
    changeStructure,
    activePathType,
    moveNode,
  } = useMarkmap({ value, setValue });

  const toggleSolidColor = (useSolidColor: boolean) => {
    setColors(
      colorPalettes.find(c => c.id === activeColor)?.colors || [
        "rgb(0, 153, 136)",
      ],
      useSolidColor,
    );
  };

  useEffect(() => {
    setTimeout(() => rescale("fit"), 200);
  }, [isFullScreen, ...fitDependencies]);

  return (
    <div
      className={cn(
        "rounded bg-holder-lighter h-full border p-2.5 col",
        className,
      )}
      {...otherProps}
    >
      <MindMapPreviewHeader
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        onClose={onClose}
        documentName={documentName}
        handleDownload={(type: "html" | "svg") =>
          handleDownload(type, documentName)
        }
      />
      <Show>
        <Show.When isTrue={!!isLoading}>
          <div className="col size-full justify-center items-center">
            <LoadingDots />
          </div>
        </Show.When>
        <Show.Else>
          <MindMapPreviewRenderer
            ref={svgRef}
            nodeMenuPosition={nodeMenuPosition}
            addNode={addNode}
            deleteNode={deleteNode}
            editNode={editNode}
            toggleExpand={toggleExpand}
            fit={() => rescale("fit")}
            backToFirstNode={backToFirstNode}
            toggleSolidColor={toggleSolidColor}
            setPath={setPath}
            selectedPath={selectedPath}
            useSolidColor={useSolidColor}
            setUseSolidColor={setUseSolidColor}
            addedPath={addedPath}
            setAddedPath={setAddedPath}
            setNodeToClipboard={setNodeToClipboard}
            moveNode={moveNode}
          />
        </Show.Else>
      </Show>
      <MindMapPreviewFooter
        language={language}
        setLanguage={setLanguage}
        rescale={rescale}
        setColors={setColors}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        changeLinkShape={changeLinkShape}
        changeStructure={changeStructure}
        activePathType={activePathType}
        openEditor={openEditor}
      />
    </div>
  );
}

export default MindMapPreview;
