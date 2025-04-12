import React, { useRef, type FC } from "react";

import type { editor } from "monaco-editor";

import { MinimalButton } from "@/components/shared";
import CodeEditor from "@/components/shared/CodeEditor";
import CopyButton from "@/components/shared/CopyButton";
import { useGetDictionary } from "@/hooks";

interface IProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
}

const MindMapEditor: FC<IProps> = ({
  title,
  onChange,
  value,
  onClose,
  isFullScreen,
  setIsFullScreen,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(undefined);
  const setEditorRef = (instanceOfEditor: editor.IStandaloneCodeEditor) => {
    editorRef.current = instanceOfEditor;
  };
  const { common } = useGetDictionary();

  return (
    <div className="size-full bg-holder-lighter  col rounded overflow-hidden border">
      <header className="w-full px-3 py-3 gap-2 row flex">
        <h1 className="me-auto">{title}</h1>
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
          icon={isFullScreen ? "mdi:arrow-collapse" : "mdi:arrow-expand"}
          onClick={() => setIsFullScreen?.(!isFullScreen)}
        />
        <MinimalButton
          size="sm"
          icon="material-symbols:close-rounded"
          onClick={onClose}
        />
      </header>
      <hr className="mx-3 mb-3"></hr>
      <CodeEditor
        setEditorRef={setEditorRef}
        value={value}
        onChange={onChange}
        language="markdown"
      />
    </div>
  );
};

export default MindMapEditor;
