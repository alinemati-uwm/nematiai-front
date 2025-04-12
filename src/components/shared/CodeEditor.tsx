"use client";

import React, { type FC } from "react";

import MonacoEditor, { type Monaco } from "@monaco-editor/react";
import { type editor } from "monaco-editor";

import Loading from "@/components/shared/Loading";
import useDarkMode from "@/hooks/useDarkMode";

interface IProps {
  value: string;
  language: string;
  onChange: (val: string) => void;
  setEditorRef: (val: editor.IStandaloneCodeEditor) => void;
}

const CodeEditor: FC<IProps> = ({
  language,
  value,
  onChange,
  setEditorRef,
}) => {
  const isDark = useDarkMode();

  function beforeEditorMount(monaco: Monaco) {
    monaco.editor.defineTheme("my-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#161a1d",
      },
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      allowJs: true,
      checkJs: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowJs: true,
      checkJs: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true, // This line disables errors in jsx tags like <div>, etc.
    });
  }

  function handleEditorMount(editorInstance: editor.IStandaloneCodeEditor) {
    setEditorRef(editorInstance);
  }

  return (
    <MonacoEditor
      height="100%"
      theme={isDark ? "my-dark" : "light"}
      defaultLanguage="javascript"
      options={
        {
          // padding: { top: 16, bottom: 16 },
          // renderLineHighlight: "none"
        }
      }
      value={value}
      loading={<Loading showLabel />}
      onChange={val => {
        val && onChange(val);
      }}
      language={language}
      onMount={handleEditorMount}
      beforeMount={beforeEditorMount}
    />
  );
};

export default CodeEditor;
