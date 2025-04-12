import React, { useRef } from "react";

import { downloadCode } from "@/components/pages/code/utils";
import { MinimalButton } from "@/components/shared";
import CopyButton from "@/components/shared/CopyButton";
import { cn } from "@/lib/utils";
import { useFullScreenElement, useGetDictionary } from "@/hooks";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  rootClassName?: string;
  headerClassName?: string;
  editorClassName?: string;
  language?: string;
}

/**
 * Code Editor component
 * use microsoft monaco editor
 * used for get code to explain or convert or show code in result
 * @param value - code value
 * @param setValue - set code value
 * @param rootClassName - additional class for root div
 * @param headerClassName - additional class for header div
 * @param editorClassName - additional class for editor div
 * @param language code language (javascript, typescript, python or ...)
 * @constructor
 */
function CodeEditor({
  value,
  setValue,
  rootClassName,
  headerClassName,
  editorClassName,
  language,
}: IProps) {
  const {
    common: { full_screen, download },
  } = useGetDictionary();
  //for copy value
  const editorRef = useRef<HTMLDivElement>(null);
  const { handleFullscreen, isActive: isFullScreen } =
    useFullScreenElement(editorRef);

  return (
    <div className={cn("w-full", rootClassName)} ref={editorRef}>
      {/*
        header
        contains title and buttons
      */}
      <div
        className={cn(
          "spacing-row h-8 rounded-t bg-muted-dark px-4 text-background",
          isFullScreen && "h-10 rounded-t-none",
          headerClassName,
        )}
      >
        <p>{language || "Text"}</p>

        <div className="row gap-1">
          {/*full screen button*/}
          <MinimalButton
            icon={
              isFullScreen ? "ri:fullscreen-exit-fill" : "ri:fullscreen-fill"
            }
            title={full_screen}
            onClick={handleFullscreen}
          />
          {/*download button*/}
          <MinimalButton
            icon="tabler:download"
            title={download}
            onClick={() => downloadCode(language || "Javascript", value)}
          />
          <CopyButton text={value} size="sm" />
        </div>
      </div>

      {/*monaco editor*/}
      {/*<Editor*/}
      {/*	height={isFullScreen ? "100%" : "250px"}*/}
      {/*	theme="vs-dark"*/}
      {/*	defaultLanguage="javascript"*/}
      {/*	value={value}*/}
      {/*	className={cn("overflow-hidden rounded-b", editorClassName)}*/}
      {/*	loading={<Loading showLabel />}*/}
      {/*	onChange={val => {*/}
      {/*		val && setValue(val);*/}
      {/*	}}*/}
      {/*	wrapperProps={{*/}
      {/*		className: "bg-[#1E1E1E] rounded-b py-3",*/}
      {/*	}}*/}
      {/*	language={language}*/}
      {/*/>*/}
    </div>
  );
}

export default CodeEditor;
