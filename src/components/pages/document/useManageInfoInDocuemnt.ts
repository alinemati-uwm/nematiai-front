"use client";

import { useEffect, useRef, useState } from "react";

import useAppLayout from "@/components/layout/hook/useAppLayout";
import { defaultValueOfEditor } from "@/components/shared/grammar_translate_rewrite/hooks/generates-hook";
import {
  type selectedUUIdANdVersion,
  type typeinfoAfterGenerate,
  type typeInfoForLeavePage,
} from "@/components/shared/grammar_translate_rewrite/types";
import { useQueryParams } from "@/hooks/useQueryParams";
import { extractTextWithSpacing } from "@/lib/utils";
import useAddPersonalDoc from "@/refactor_lib/hooks/mutations/useAddPersonalDoc";
import { useHistoryUpdateChild } from "@/services/history";

import { useDrawerInfo } from "../chat/hooks/useDrawerInfo";

/**
 * Custom hook to manage information in a document.
 *
 * @returns {Object} - The hook returns an object containing various functions and state variables to manage document information.
 *
 * @property {Function} aftergenerate - Function to handle actions after generating a document.
 * @property {Function} setInfoForLeavePage - Function to set information for leaving the page.
 * @property {Function} beforeChangeDocument - Function to handle actions before changing the document.
 * @property {Function} afterUpdate - Function to handle actions after updating the document.
 * @property {Function} setFlagNewDocuemnt - Function to set the flag for a new document.
 * @property {string} selectedUUID - The UUID of the selected document.
 * @property {Function} setSelectedUUID - Function to set the UUID of the selected document.
 * @property {string} selectedVersion - The version of the selected document.
 * @property {Function} setSelectedVersion - Function to set the version of the selected document.
 * @property {number} keyEditor - Key for the editor.
 * @property {Object} infoAfterGenerate - Information after generating the document.
 */
export const useManageInfoInDocuemnt = () => {
  const [selectedUUID, setSelectedUUID] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [keyEditor, setKeyEditor] = useState<number>(-1);
  const { mutate: updateHistory } = useHistoryUpdateChild({
    appName: "personal",
  });
  const FlagNewDocuemnt = useRef<boolean>(true);
  const { setQueryByRouter, queries } = useQueryParams();
  const { mutate, isPending } = useAddPersonalDoc();
  const { toggleOpen } = useAppLayout();
  const infoForLeavePage = useRef<typeInfoForLeavePage>({
    hasChange: false,
    valueEditor: defaultValueOfEditor,
  });
  const [infoAfterGenerate, setInfoAftreGenerate] =
    useState<typeinfoAfterGenerate>({ documentName: "" });

  const { drawerInfo } = useDrawerInfo();

  useEffect(() => {
    if (selectedUUID) FlagNewDocuemnt.current = false;

    setInfoForLeavePage({ hasChange: false });
    if (selectedUUID && selectedUUID !== "" && !drawerInfo.show) {
      toggleOpen(true);
    }
  }, [selectedUUID]);

  const afterUpdate = ({
    version,
    uuid,
    audio,
    podcast,
  }: selectedUUIdANdVersion) => {
    if (queries.version !== version) {
      aftergenerate({
        audio,
        podcast,
      });
      setQueryByRouter({ uuid: uuid, version: version });
      setSelectedVersion(version);
    }
  };

  const setInfoForLeavePage = ({
    valueEditor,
    hasChange,
  }: typeInfoForLeavePage) => {
    let object = infoForLeavePage.current;
    if (valueEditor !== undefined) {
      object = { ...object, valueEditor };
    }
    if (hasChange !== undefined) {
      object = { ...object, hasChange };
    }
    infoForLeavePage.current = object;

    if (!selectedUUID && valueEditor && FlagNewDocuemnt.current) {
      const text = extractTextWithSpacing(valueEditor);

      if (text.length > 10) {
        if (isPending) {
          return;
        }
        FlagNewDocuemnt.current = false;
        mutate(
          { name: text, value: JSON.stringify(valueEditor) },
          {
            onSuccess: response => {
              const data = response.data;
              setSelectedUUID(data.history.uuid);
              setQueryByRouter({ uuid: data.history.uuid }, ["version"]);
              aftergenerate({ documentName: data.name });
            },
          },
        );
      }
    }
  };

  const beforeChangeDocument = (uuid: string) => {
    if (
      infoForLeavePage.current.hasChange &&
      infoForLeavePage.current.valueEditor
    ) {
      updateHistory({
        answer_text: JSON.stringify(infoForLeavePage.current.valueEditor),
        answerUuid: uuid,
      });
    }
  };

  const aftergenerate = ({
    documentName,
    audio,
    podcast,
  }: typeinfoAfterGenerate) => {
    setInfoAftreGenerate({
      documentName:
        documentName === undefined
          ? infoAfterGenerate.documentName
          : documentName,
      audio: audio === undefined ? infoAfterGenerate.audio : audio,
      podcast: podcast === undefined ? infoAfterGenerate.podcast : podcast,
    });
  };

  const setFlagNewDocuemnt = (val: boolean) => {
    if (val) {
      setKeyEditor(key => key + 1);
    }
    FlagNewDocuemnt.current = val;
  };
  return {
    aftergenerate,
    setInfoForLeavePage,
    beforeChangeDocument,
    afterUpdate,
    setFlagNewDocuemnt,
    selectedUUID,
    setSelectedUUID,
    selectedVersion,
    setSelectedVersion,
    keyEditor,
    infoAfterGenerate,
  };
};
