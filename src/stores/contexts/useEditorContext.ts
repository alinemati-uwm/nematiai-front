"use client";

import type React from "react";
import { createContext, useContext } from "react";

import { type PlateEditor } from "@udecode/plate-common/react";

type textareaEditorDivType = React.RefObject<HTMLDivElement | null>;
type editorRefType = React.MutableRefObject<PlateEditor | null>;
type editorAndFooterButtonsWrapperRefType =
  React.RefObject<HTMLDivElement | null>;
type editorTextBoxType = React.MutableRefObject<HTMLElement | null>;
interface editorContextType {
  editorRef: editorRefType;
  textareaEditorDivRef: textareaEditorDivType;
  editorAndFooterButtonsWrapperRef: editorAndFooterButtonsWrapperRefType;
}

export const EditorContext = createContext<editorContextType | null>(null);

export function useEditorContext() {
  const state = useContext(EditorContext);
  if (!state) {
    throw new Error("editor context is not valid");
  }
  return state;
}
