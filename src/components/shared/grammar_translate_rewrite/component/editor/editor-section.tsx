"use client";

import React, {
  useEffect,
  useReducer,
  useState,
  type PropsWithChildren,
} from "react";

import { type Value } from "@udecode/slate";
import dynamic from "next/dynamic";

import Highlight from "@/components/shared/Highlight";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import { useGetDictionary } from "@/hooks";
import { LocalStreamResponseProvider } from "@/refactor_lib/contexts/LocalStreamResponseContext";

import { useUpdateByChangeValueOfEditor } from "../../hooks/useUpdateByChangeValueOfEditor";
import type { DrawerMenu, typeinfoAfterGenerate } from "../../types";
import {
  type selectedUUIdANdVersion,
  type typeInfoForLeavePage,
} from "../../types";
import { DocumentEditorContext } from "./context";

import "./editor-section.css";

import { reducerEditor } from "./reducer";

const Editor = dynamic(() => import("./editor"), {
  loading: () => <HomeLoading />,
});
const EditorSectionFooter = dynamic(() => import("./footer"));
const EditorSectionHeader = dynamic(() => import("./header-actions"));

type Props = {
  initialValue: Value;
  selectedVersion: string;
  appName: AppsType;
  readonly?: boolean;
  selectedUUID: string;
  infoAfterGenerate: typeinfoAfterGenerate;
  setEditorValue: React.Dispatch<React.SetStateAction<Value>>;
  setOnUsePrompt?: (val: string) => void;
  setInfoForLeavePage?: ({
    hasChange,
    valueEditor,
  }: typeInfoForLeavePage) => void;
  afterUpdate?: ({ uuid, version }: selectedUUIdANdVersion) => void;
  voiceJustForMain?: boolean;
  doNotSHowNoFile?: boolean;
  onClickHistoryInEditor?: () => void;
  setDrawerMenu?: (val: DrawerMenu) => void;
} & PropsWithChildren;

/**
 * this component is a wrapper for editor section
 * @param children  - children of editor section
 * @param afterUpdate - function to call after update with selected UUID and version
 * @param infoAfterGenerate - information after generating
 * @param appName - app name
 * @param selectedUUID - selected UUID
 * @param initialValue - initial value of editor
 * @param selectedVersion - selected version
 * @param setEditorValue - function to set the editor value
 * @param doNotSHowNoFile - flag to not show no file
 * @param voiceJustForMain - flag to show voice just for main
 * @param onClickHistoryInEditor - function to handle click on history in editor
 * @param readonly - flag to make editor readonly
 * @param setInfoForLeavePage - function to set information for leaving the page
 * @param setOnUsePrompt - function to set on use prompt
 * @constructor
 */
const EditorSection = ({
  setInfoForLeavePage = () => {},
  setOnUsePrompt = () => {},
  afterUpdate = () => {},
  infoAfterGenerate,
  appName,
  selectedUUID,
  readonly = false,
  children,
  initialValue,
  selectedVersion,
  setEditorValue,
  doNotSHowNoFile = false,
  voiceJustForMain = false,
  onClickHistoryInEditor,
  setDrawerMenu,
}: Props) => {
  const setIsFullScreen = useEditorStore.use.setIsFullScreen();

  const { editor_section: lang } = useGetDictionary().components;

  const [editorStates, editorDispatch] = useReducer(reducerEditor, {
    text: "",
    valueEditor: null,
    initialValueEditor: [
      {
        children: [{ text: "" }],
        type: "p",
      },
    ],
  });

  const [noDocument, setNoDocument] = useState<boolean>(true);

  useEffect(() => {
    if (
      selectedUUID ||
      editorStates.text !== "" ||
      readonly ||
      doNotSHowNoFile
    ) {
      setNoDocument(false);
    } else {
      setNoDocument(true);
    }
  }, [editorStates.valueEditor, selectedUUID, readonly]);

  useEffect(() => {
    return () => {
      setIsFullScreen(false);
    };
  }, [setIsFullScreen]);

  const { update } = useUpdateByChangeValueOfEditor({
    selectedUUID,
    isPendingGenerate: readonly,
    appName,
    editorValue: initialValue,
    setInfoForLeavePage,
    afterUpdate,
    setEditorValue,
    selectedVersion,
  });

  const onchangeEditor = (value: Value, lockOnChange: boolean) => {
    setInfoForLeavePage({ valueEditor: value });
    update(value, lockOnChange);
  };

  useEffect(() => {}, [selectedUUID, selectedVersion]);

  useEffect(() => {}, [editorStates.text]);

  return (
    <LocalStreamResponseProvider
      responseMessage={editorStates.text || ""}
      responseIsPending={readonly}
    >
      <DocumentEditorContext value={{ editorDispatch, ...editorStates }}>
        <div
          className={cn(
            "flex flex-row overflow-hidden transition-all duration-300 h-full",
          )}
        >
          <div
            className={cn(
              "relative flex w-full divide-x overflow-hidden rounded border bg-holder-lighter h-full",
            )}
          >
            {/* editor section*/}
            {noDocument && (
              <div className=" absolute bg-holder-lighter opacity-[0.5] w-full h-full z-[10] flex flex-col items-center justify-center">
                <label>{lang.editor_no_file}</label>
              </div>
            )}
            <div className="relative z-[5] w-full overflow-hidden h-full flex-col flex">
              {/* editor header like download and save and workspace */}

              <EditorSectionHeader
                setOnUsePrompt={setOnUsePrompt}
                infoAfterGenerate={infoAfterGenerate}
                selectedUUID={selectedUUID}
                onClickHistoryInEditor={onClickHistoryInEditor}
                appName={appName}
                setDrawerMenu={setDrawerMenu}
              />
              {/* editor */}
              <Editor
                readonly={readonly}
                initialValue={initialValue}
                onChange={onchangeEditor}
              />
              {/*editor footer contains number of words or char ,...*/}
              <EditorSectionFooter
                appName={appName}
                voiceJustForMain={voiceJustForMain}
                selectedVersion={selectedVersion}
                infoAfterGenerate={infoAfterGenerate}
                selectedUUID={selectedUUID}
              />
            </div>
            {/* history section*/}
          </div>
          {children}
        </div>

        <Highlight />
      </DocumentEditorContext>
    </LocalStreamResponseProvider>
  );
};
EditorSection.displayName = "EditorSection";
export default EditorSection;
