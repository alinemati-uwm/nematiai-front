"use client";

import React, { useEffect, useReducer, useState } from "react";

import { type Value } from "@udecode/slate";

import { testValueEditor } from "@/components/editor/editor";
import {
  FormTextBox,
  SubmitButtonSelectEngine,
} from "@/components/shared/grammar_translate_rewrite/component/form-section-components";
import FormWrapper from "@/components/shared/grammar_translate_rewrite/component/form-wrapper";
import useHighlightStore from "@/stores/zustand/highlight-store";

import LoadingPage from "../../LoadingPage";
import {
  createValueEditor,
  defaultValueOfEditor,
  useHandleGeneratedData,
} from "../hooks/generates-hook";
import { useLoadDetailsByQuery } from "../hooks/useLoadDetailsByQuery";
import { infoCreateDocument, infoCreateDocumentDefault } from "../reducer";
import { type typePropsCreateDocument } from "../types";
import type {
  typeAfterLoadDetails,
  typeinfoAfterGenerate,
  typeUsePrompt,
} from "../types";

interface IProps extends typePropsCreateDocument {
  onusePrompt: typeUsePrompt;
  onAftergenerate: ({ prompt, documentName }: typeinfoAfterGenerate) => void;
  setIsGenerateing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUUID: React.Dispatch<React.SetStateAction<string>>;
  setEditorValue: React.Dispatch<React.SetStateAction<Value>>;
  setSelectedVersion: React.Dispatch<React.SetStateAction<string>>;
  selectedUUID: string;
  selectedVersion: string;
}

/**
 * Component for generating a document form.
 *
 * @param {Object} props - The properties for the component.
 * @param {typeUsePrompt} props.onusePrompt - The prompt to use for generating the document.
 * @param {function} props.onAftergenerate - Callback function after generating the document.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsGenerateing - Function to set the generating state.
 * @param {string} props.appName - The name of the application.
 * @param {boolean} [props.advanced=true] - Flag to indicate if advanced options should be shown.
 * @param {function} props.onCreatePrompt - Function to create the prompt.
 * @param {string} props.btnTitle - The title of the button.
 * @param {string} props.placeHolderPrompt - The placeholder text for the prompt.
 * @param {boolean} [props.translateLanguages=false] - Flag to indicate if translation languages should be shown.
 * @param {React.Dispatch<React.SetStateAction<Value>>} props.setEditorValue - Function to set the editor value.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setSelectedUUID - Function to set the selected UUID.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setSelectedVersion - Function to set the selected version.
 * @param {string} props.selectedUUID - The selected UUID.
 * @param {string} props.selectedVersion - The selected version.
 */
const FormGenerateDocument = ({
  onusePrompt,
  onAftergenerate,
  setIsGenerateing,
  appName,
  advanced = true,
  onCreatePrompt,
  btnTitle,
  placeHolderPrompt,
  translateLanguages = false,
  setEditorValue,
  setSelectedUUID,
  setSelectedVersion,
  selectedVersion,
  selectedUUID,
}: IProps) => {
  const setHighlightIsOpen = useHighlightStore.use.setHighlightIsOpen();
  const [prompt, setValuePrompt] = useState<string>("");

  const [keyPrompt, setKeyPrompt] = useState<number>(-1);

  const [errorMaxSize, setErrorMaxSize] = useState<boolean>(false);
  const [statesOfInfoCreateDocument, dispatchOfInfoCreateDocument] = useReducer(
    infoCreateDocument,
    infoCreateDocumentDefault,
  );

  /**
   * Handle the details after loading.
   *
   * @param {Object} param - The parameters for after loading details.
   * @param {Object} param.data - The data loaded.
   * @param {Object} param.selected - The selected item.
   * @param {boolean} param.reset - Flag to indicate if reset is needed.
   */
  const afterLoadDetails = ({
    data,
    selected,
    reset,
  }: typeAfterLoadDetails) => {
    if (data && selected) {
      let valueEditor, podcast, audio;

      // Get the model icon
      const modelIcon =
        (data.model_generator && data.model_generator.icon) || "";
      if (selected.version === "") {
        valueEditor = createValueEditor(data.answer_text);
        podcast = data.podcast;
        audio = data.audio;
      } else {
        if (
          testValueEditor(JSON.parse(data.versions[0].answer_text) as Value)
        ) {
          valueEditor = JSON.parse(data.versions[0].answer_text) as Value;
        } else {
          valueEditor = createValueEditor(data.versions[0].answer_text);
        }

        podcast = data.versions[0].podcast;
        audio = data.versions[0].audio;
      }

      setEditorValue(valueEditor);
      onAftergenerate({
        prompt: data.prompt,
        documentName: data.title || "Document name",
        podcast: podcast || "",
        audio: audio || "",
        modelIcon: modelIcon,
      });
    } else if (reset) {
      setEditorValue(defaultValueOfEditor);
      onAftergenerate({
        prompt: "",
        documentName: "",
        podcast: "",
        audio: "",
        modelIcon: "",
      });
    }
  };
  /**
   * Handle actions before generating the document.
   */
  const beforeGenerate = () => {
    onAftergenerate({
      prompt: "",
      documentName: "",
      podcast: "",
      audio: "",
      modelIcon: "",
    });

    return;
  };

  /**
   * Set the value in the text area.
   *
   * @param {string} value - The value to set.
   */
  const setInTextArea = (value: string) => {
    setValuePrompt(value);
    setKeyPrompt(key => key + 1);
  };

  /**
   * Handle actions after generating the document.
   *
   * @param {Object} param - The parameters for after generating.
   * @param {string} param.documentName - The name of the document.
   * @param {string} param.modelIcon - The icon of the model.
   */
  const afterGenerate = ({
    documentName,
    modelIcon,
  }: Pick<typeinfoAfterGenerate, "documentName"> & { modelIcon: string }) => {
    onAftergenerate({
      prompt,
      documentName: documentName,
      modelIcon: modelIcon,
    });
    dispatchOfInfoCreateDocument({
      type: "SET_STATE",
      listStates: {
        documentName: "",
      },
    });
    return;
  };

  const { handelGenerate, isPendingGenerate, stopGenerate, isPendingForStop } =
    useHandleGeneratedData({
      beforeGenerate,
      afterGenerate,
      setSelectedVersion,
      setSelectedUUID,
      setEditorValue,
      appName,
    });

  const { isPending: isPEndingWhenLoadDetailsByQuery } = useLoadDetailsByQuery({
    selectedUUID,
    appName,
    setSelectedUUID,
    selectedVersion,
    setSelectedVersion,
    afterLoadDetails,
  });

  // Set the generating state
  useEffect(() => {
    setIsGenerateing(isPendingGenerate);
  }, [isPendingGenerate]);

  // Close the highlight
  useEffect(() => {
    return () => {
      setHighlightIsOpen(false);
    };
  }, []);

  // Set the prompt in the text area
  useEffect(() => {
    setInTextArea(onusePrompt.value);
  }, [onusePrompt]);

  /**
   * Handle the generate button click.
   */
  function handleGenerate() {
    if (prompt !== "") {
      handelGenerate(
        onCreatePrompt(prompt, {
          language: statesOfInfoCreateDocument.language,
          creativityLevel: statesOfInfoCreateDocument.creativityLevel,
          pointOfView: statesOfInfoCreateDocument.pointOfView,
          tone: statesOfInfoCreateDocument.tone,
          format: statesOfInfoCreateDocument.format,
        }),
      );
    }
  }

  return (
    <FormWrapper className=" !pb-0">
      <FormTextBox
        stateAndDispatchInfo={{
          state: statesOfInfoCreateDocument,
          dispatch: dispatchOfInfoCreateDocument,
        }}
        keyPrompt={keyPrompt}
        advanced={advanced}
        value={prompt}
        onTextAreaChange={setValuePrompt}
        onKeydown={handleGenerate}
        maxLength={4000}
        translateLanguages={translateLanguages}
        placeHolderPrompt={placeHolderPrompt}
        setErrorMaxSize={setErrorMaxSize}
      />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine
        isDisabledSubmit={prompt.trim() === "" || errorMaxSize}
        isPending={isPendingGenerate}
        onClick={handleGenerate}
        stopGenerate={stopGenerate}
        isPendingForStop={isPendingForStop}
        buttonContent={btnTitle}
        appType="AI_WRITER"
      />

      {isPEndingWhenLoadDetailsByQuery && <LoadingPage></LoadingPage>}
    </FormWrapper>
  );
};

export default FormGenerateDocument;
