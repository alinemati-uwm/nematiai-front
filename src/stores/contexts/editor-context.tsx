"use client";

import { useRef } from "react";

import { type PlateEditor } from "@udecode/plate-common/react";

import type { ChildrenProps } from "@/services/types";

import { EditorContext } from "./useEditorContext";

/**
 * @param children all children in this provider receive editor information
 * like editor value or editorRef or editorTextareaRef
 * @returns children that wrapped in provider
 */
export function EditorContextProvider({ children }: ChildrenProps<any>) {
  const editorRef = useRef<PlateEditor | null>(null);

  // for download and scroll
  const textareaEditorDivRef = useRef<HTMLDivElement>(null);
  // for portal to show dropdown ,... in full screen mode
  const editorAndFooterButtonsWrapperRef = useRef<HTMLDivElement>(null);

  const value = {
    editorRef,
    textareaEditorDivRef,
    editorAndFooterButtonsWrapperRef,
  };

  return <EditorContext value={value}>{children}</EditorContext>;
}
