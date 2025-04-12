"use client";

import React, { useEffect, useRef, useState, type FC } from "react";

import dynamic from "next/dynamic";

import { downloadCode } from "@/components/pages/chat/utils";
import { MinimalButton } from "@/components/shared";
import CopyButton from "@/components/shared/CopyButton";
import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import { useGetDictionary } from "@/hooks";

import { useDrawerInfo } from "../hooks/useDrawerInfo";

interface IProps {
  initialValue: string;
  title: string;
  codeLanguage?: string;
}

const CodeEditor = dynamic(() => import("@/components/shared/CodeEditor"), {
  loading: () => <HomeLoading />,
});

const ChatCodeEditor: FC<IProps> = ({
  initialValue,
  codeLanguage = "javascript",
  title,
}) => {
  const [value, setValue] = useState("");
  const { close } = useDrawerInfo();
  const editorRef = useRef<any>(null);
  const setEditorRef = (instanceOfEditor: any) => {
    editorRef.current = instanceOfEditor;
  };

  // const [plateValue, setPlateValue] = useState<Value>();
  const { common } = useGetDictionary();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="size-full bg-holder-lighter  col rounded overflow-hidden">
      <header className="w-full px-3 py-3 gap-2 row flex justify-between">
        <h1 className="me-auto">{title}</h1>
        <div className="row gap-4">
          <MinimalButton
            size="sm"
            icon="mdi:download-circle-outline"
            onClick={() =>
              downloadCode(
                codeLanguage || "Javascript",
                value,
                title.toLowerCase().replaceAll(" ", "-"),
              )
            }
          />
          {/*<Button className="row gap-1.5">*/}
          {/*    <AppIcon fontSize={20} icon="ic:outline-play-circle"/>*/}
          {/*    {chatDictionary.run_button_label}*/}
          {/*</Button>*/}

          <MinimalButton
            size="sm"
            icon="mdi:undo"
            title={common.Undo}
            onClick={() => {
              editorRef.current?.trigger("keyboard", "undo", null);
            }}
          />
          <MinimalButton
            size="sm"
            icon="mdi:redo"
            title={common.Redo}
            onClick={() => {
              editorRef.current?.trigger("keyboard", "redo", null);
            }}
          />
          <CopyButton text={value} size="sm" />
          <MinimalButton
            size="sm"
            icon="material-symbols:close-rounded"
            onClick={() => {
              close();
            }}
          />
        </div>
      </header>
      <hr className="mx-3 mb-3"></hr>
      <CodeEditor
        setEditorRef={setEditorRef}
        value={value}
        onChange={setValue}
        language={codeLanguage}
      />
    </div>
  );
};
export default ChatCodeEditor;
