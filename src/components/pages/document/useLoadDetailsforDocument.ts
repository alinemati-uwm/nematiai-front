"use client";

import { type Value } from "@udecode/slate";

import { testValueEditor } from "@/components/editor/editor";
import { createValueEditor } from "@/components/shared/grammar_translate_rewrite/hooks/generates-hook";
import { useLoadDetailsByQuery } from "@/components/shared/grammar_translate_rewrite/hooks/useLoadDetailsByQuery";
import { type typeAfterLoadDetails } from "@/components/shared/grammar_translate_rewrite/types";

import { type typeUseLoadDetailsforDocument } from "./types";

/**
 * Custom hook to load document details and handle the state updates.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.selectedUUID - The UUID of the selected document.
 * @param {Function} params.setSelectedUUID - Function to set the selected UUID.
 * @param {string} params.selectedVersion - The selected version of the document.
 * @param {Function} params.setSelectedVersion - Function to set the selected version.
 * @param {Function} params.setEditorValue - Function to set the editor value.
 * @param {Function} params.onAftergenerate - Callback function to execute after generating the document details.
 *
 * @returns {Object} - An object containing the loading state.
 * @returns {boolean} isPending - Indicates if the document details are being loaded.
 */
export const useLoadDetailsforDocument = ({
  selectedUUID,
  setSelectedUUID,
  selectedVersion,
  setSelectedVersion,
  setEditorValue,
  onAftergenerate,
}: typeUseLoadDetailsforDocument) => {
  const afterLoadDetails = ({
    data,
    selected,
    reset,
  }: typeAfterLoadDetails) => {
    if (data) {
      let answer_text = data.answer_text;
      let slateValue;
      const podcast = data.podcast;
      const audio = data.audio;

      if (data.versions.length > 0 && data.versions[0].answer_text !== null) {
        answer_text = data.versions[0].answer_text;
      } else {
        answer_text = data.answer_text;
      }

      if (testValueEditor(JSON.parse(answer_text) as Value)) {
        slateValue = JSON.parse(answer_text) as Value;
      } else {
        slateValue = createValueEditor(answer_text);
      }

      setEditorValue(slateValue);

      onAftergenerate({
        documentName: data.title || "Document name",
        podcast: podcast || "",
        audio: audio || "",
      });
    }
  };

  const { isPending } = useLoadDetailsByQuery({
    selectedUUID,
    appName: "personal",
    setSelectedUUID,
    selectedVersion,
    setSelectedVersion,
    afterLoadDetails,
  });

  return {
    isPending,
  };
};
