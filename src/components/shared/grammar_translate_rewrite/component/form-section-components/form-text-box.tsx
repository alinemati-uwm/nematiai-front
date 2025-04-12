"use client";

import React, { useEffect, useState, type TextareaHTMLAttributes } from "react";

import type { FilesType } from "@/components/ui/attachments/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePrompt from "@/components/ui/prompt/Prompt";
import { useGetDictionary } from "@/hooks";
import SelectFormLanguage from "@/refactor_lib/components/molecules/SelectFormLanguage";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";
import { useCovertPdfToText } from "@/services/covert-pdf-to-text";

import type { typeStateAndDispatchCreateDocument } from "../../reducer";
import { OptionsSelectBoxes } from "./options-select-boxes";
import { SelectTranslateLanguages } from "./select-translate-languages";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  value: string;
  onTextAreaChange: (value: string) => void;
  advanced: boolean;
  translateLanguages: boolean;
  placeHolderPrompt: string;
  setErrorMaxSize: (value: boolean) => void;
  stateAndDispatchInfo: typeStateAndDispatchCreateDocument;
  keyPrompt: number;
  onKeydown: () => void;
}

/**
 * Component for the grammar text box layout.
 *
 * @param {Object} props - The properties for the component.
 * @param {number} [props.maxLength] - The maximum length of the text.
 * @param {string} props.value - The value of the text area.
 * @param {function} props.onTextAreaChange - Function to handle text area change.
 * @param {boolean} props.advanced - Flag to indicate if advanced options should be shown.
 * @param {boolean} [props.translateLanguages=false] - Flag to indicate if translation languages should be shown.
 * @param {RefObject<HTMLDivElement>} props.editableDivRef - Reference to the editable div element.
 * @param {string} props.placeHolderPrompt - The placeholder text for the prompt.
 * @param {function} props.setErrorMaxSize - Function to set the error state for max size.
 * @param {typeStateAndDispatchCreateDocument} props.stateAndDispatchInfo - State and dispatch information for creating a document.
 * @param {number} props.keyPrompt - The key prompt value.
 * @param {function} props.onKeydown - Function to handle keydown event.
 */
const FormTextBoxLayout = React.memo(
  ({
    onKeydown,
    maxLength,
    placeHolderPrompt,
    advanced,
    value,
    onTextAreaChange,
    translateLanguages = false,
    setErrorMaxSize,
    stateAndDispatchInfo,
    keyPrompt,
  }: IProps) => {
    const {
      components: { form_section },
      common: commonLang,
    } = useGetDictionary();

    const [isUploading, setIsUploading] = useState(false);

    const { mutateAsync: covertPDF } = useCovertPdfToText();

    const { toaster } = useToaster();

    /**
     * Get files and convert PDF to text.
     *
     * @param {FilesType} files - The files to convert.
     * @returns Promise<void>
     */
    const getFiles = async (files: FilesType) => {
      const filesArarye = Object.values(files);
      const errorFile = [];
      const successFile = [];
      setIsUploading(true);
      for (const file of filesArarye) {
        const text = await covertPDF(file);
        if (text) {
          addText(text);
          successFile.push(file);
        } else {
          errorFile.push(file);
        }
      }
      showMessageAfterUploadFile(successFile, "success");
      showMessageAfterUploadFile(errorFile, "error");
      setIsUploading(false);

      return;
    };

    /**
     * Show message after uploading files.
     *
     * @param {File[]} files - The files that were uploaded.
     * @param {string} type - The type of message to show.
     */
    const showMessageAfterUploadFile = (files: File[], type: string) => {
      if (files.length === 0) return;

      const fileName = files.map((file, index) => {
        return (
          <li className="truncate max-w-[90%] block" key={index}>
            {index + 1}. {file.name}{" "}
          </li>
        );
      }, []);

      toaster({
        toastProps: {
          type: type as "success" | "error",
          content: (
            <div>
              <label
                className={`text-${type === "error" ? "danger" : "Usuccessloaded"}`}
              >
                {type === "error" ? "Unuploaded " : "Uploaded "}files!
              </label>
              <ul className="">{fileName}</ul>
            </div>
          ),
        },
      });
    };

    const { content, addText, error } = usePrompt({
      key: keyPrompt,
      initialValue: value,
      placeholder: placeHolderPrompt,
      copy: true,
      volume: true,
      clean: true,
      maxsize: maxLength,
      onGetNewFile: getFiles,
      onchange: onTextAreaChange,
      loadingUpload: isUploading,
      onKeydown: onKeydown,
    });

    useEffect(() => {
      setErrorMaxSize(error);
    }, [error]);

    const InputDocumentName = (
      <div className="flex flex-col gap-label-space">
        <Label className="row m-0 gap-1">{commonLang.document_name}</Label>

        <Input
          type="text"
          className="text-small md:text-base w-full   py-1 "
          placeholder={commonLang.document_name}
          value={stateAndDispatchInfo.state.documentName}
          onChange={e => {
            stateAndDispatchInfo.dispatch({
              type: "SET_STATE",
              listStates: {
                documentName: e.target.value,
              },
            });
          }}
        />
      </div>
    );

    return (
      <>
        <div className="gap-label-space flex flex-col">
          <div className="flex flex-row justify-between items-end">
            <div className="flex w-full  h-full items-start">
              <label className="text-base">
                {form_section.form_grammar_textarea_label}
              </label>
            </div>
          </div>
          <div className="col max-h-auto gap-label-space">{content}</div>
        </div>
        {translateLanguages && (
          <SelectTranslateLanguages
            InputDocumentName={InputDocumentName}
            stateAndDispatchInfo={stateAndDispatchInfo}
          />
        )}
        {!translateLanguages && (
          <SelectFormLanguage stateAndDispatchInfo={stateAndDispatchInfo} />
        )}
        {advanced && (
          <OptionsSelectBoxes
            hiddenSelectResponseLang
            stateAndDispatchInfo={stateAndDispatchInfo}
          />
        )}
      </>
    );
  },
);

FormTextBoxLayout.displayName = "FormTextBoxLayout";
export const FormTextBox = FormTextBoxLayout;
