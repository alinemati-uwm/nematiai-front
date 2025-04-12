"use client";

import React from "react";

import { type Value } from "@udecode/slate";

import EditorSection from "@/components/shared/grammar_translate_rewrite/component/editor/editor-section";
import type {
  DrawerMenu,
  typeinfoAfterGenerate,
} from "@/components/shared/grammar_translate_rewrite/types";
import {
  type selectedUUIdANdVersion,
  type typeInfoForLeavePage,
} from "@/components/shared/grammar_translate_rewrite/types";

interface IPageEditorProps {
  setInfoForLeavePage: ({
    hasChange,
    valueEditor,
  }: typeInfoForLeavePage) => void;
  infoAfterGenerate: typeinfoAfterGenerate;
  selectedUUID: string;
  editorValue: Value;
  selectedVersion: string;
  setEditorValue: React.Dispatch<React.SetStateAction<Value>>;
  afterUpdate?: ({ uuid, version }: selectedUUIdANdVersion) => void;
  doNotSHowNoFile?: boolean;
  onClickHistoryInEditor: () => void;
  setDrawerMenu?: (val: DrawerMenu) => void;
}

/**
 * PageEditor component props and function.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.setInfoForLeavePage - Function to set information for leaving the page.
 * @param {typeinfoAfterGenerate} props.infoAfterGenerate - Information after generating.
 * @param {string} props.selectedUUID - The selected UUID.
 * @param {Value} props.editorValue - The value of the editor.
 * @param {React.Dispatch<React.SetStateAction<Value>>} props.setEditorValue - Function to set the editor value.
 * @param {string} props.selectedVersion - The selected version.
 * @param {Function} [props.afterUpdate] - Optional function to call after update with selected UUID and version.
 * @param {Function} props.onClickHistoryInEditor - Function to handle click on history in editor.
 *
 * @returns JSX.Element The PageEditor component.
 */
const PageEditor = ({
  infoAfterGenerate,
  selectedUUID,
  editorValue,
  setInfoForLeavePage,
  setEditorValue,
  selectedVersion,
  afterUpdate,
  onClickHistoryInEditor,
  setDrawerMenu,
}: IPageEditorProps) => {
  return (
    <EditorSection
      voiceJustForMain={true}
      afterUpdate={afterUpdate}
      setEditorValue={setEditorValue}
      setInfoForLeavePage={setInfoForLeavePage}
      infoAfterGenerate={infoAfterGenerate}
      selectedUUID={selectedUUID}
      initialValue={editorValue}
      appName="personal"
      doNotSHowNoFile={true}
      selectedVersion={selectedVersion}
      onClickHistoryInEditor={onClickHistoryInEditor}
      setDrawerMenu={setDrawerMenu}
    />
  );
};

export default PageEditor;
