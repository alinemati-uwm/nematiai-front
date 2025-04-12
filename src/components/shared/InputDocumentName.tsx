"use client";

import React, { useEffect, useRef, useState } from "react";

import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";
import useChaneNameOfdoc from "@/refactor_lib/hooks/mutations/useChaneNameOfdoc";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

import AppTypo from "../ui/AppTypo";
import { MinimalButton } from "./MinimalButtton";

type PropsType = {
  onChange?: (val: string) => void;
  onsave?: () => void;
  placeHolder?: string;
  uuid?: string;
  value?: string;
  appName: AppsType;
  justEdit?: boolean;
  showHover?: boolean;
  onSubmit?: () => void;
};

/**
 * Component to handle the input and editing of a document name.
 *
 * @param {Object} props - The properties for the component.
 * @param {function} [props.onChange] - Function to handle the change in input value.
 * @param {function} [props.onsave] - Function to handle the save action.
 * @param {string} [props.placeHolder] - Placeholder text for the input.
 * @param {string} [props.uuid] - Unique identifier for the document.
 * @param {string} [props.value="Document Name"] - Initial value of the input.
 * @param {AppsType} props.appName - The name of the application.
 * @param {boolean} [props.justEdit=false] - Flag to indicate if the component is in edit mode.
 * @param {boolean} [props.showHover=false] - Flag to indicate if hover effect should be shown.
 */
export default function InputDocumentName({
  onChange = () => {},
  onsave = () => {},
  placeHolder = "",
  uuid = "",
  value = "Document Name",
  appName,
  justEdit = false,
  showHover = false,
  onSubmit,
}: PropsType) {
  const { common: commonLang } = useGetDictionary();
  const inputRef = useRef<HTMLInputElement>(null);
  const [changable, setChangable] = useState(uuid !== "");
  const [editable, setEditable] = useState(false);
  const [input, setInput] = useState<string>(value);
  const [noDocumentName, setNoDocumentName] = useState<boolean>(
    value === "" && uuid === "",
  );

  const { mutate, data, isPending } = useChaneNameOfdoc(uuid);
  const { toaster } = useToaster();

  if (placeHolder === "") {
    placeHolder = commonLang.document_name;
  }

  /**
   * Save the document name.
   */
  const save = () => {
    if (onSubmit) {
      onSubmit();
      return;
    }
    if (input === "" || input.length < 4) {
      toaster({
        toastProps: {
          type: "warning",
          message: commonLang.document_name_not_empty,
        },
      });
      return;
    }

    // Save the document name
    mutate(
      { name: input, appName: appName, uuid: uuid },
      {
        onError: (error: any) => {
          toaster({
            toastProps: {
              type: "error",
              message: commonLang.error_change_document_name,
            },
          });
        },
        onSuccess: () => {
          onsave();
          toaster({
            toastProps: {
              type: "success",
              message: commonLang.success_change_document_name,
            },
          });
        },
      },
    );

    setEditable(false);
  };

  /**
   * Enable edit mode.
   */
  const edit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    setEditable(true);
  };

  // Reset input value when uuid changes
  useEffect(() => {
    if (uuid === "") setInput("");
  }, [uuid]);

  // Set input value when data is fetched
  useEffect(() => {
    if (data) setInput(data?.data.name);
  }, [data]);

  // Set input value when value changes
  useEffect(() => {
    setInput(value);
  }, [value]);

  // Set noDocumentName flag when value or uuid changes
  useEffect(() => {
    setNoDocumentName(value === "" && uuid === "");
  }, [value, uuid]);

  // Set changable flag when uuid changes
  useEffect(() => {
    setChangable(uuid !== "");
  });
  // Set editable flag when uuid changes
  useEffect(() => {
    setEditable(false);
  }, [uuid]);

  // Set editable flag when justEdit changes
  if (justEdit === false && uuid === "") {
    return (
      <Input
        type="text"
        className="text-small md:text-base w-full py-1"
        placeholder="Document Name"
        onChange={e => {
          onChange(e.target.value);
        }}
      />
    );
  }

  return (
    <div
      title={input}
      className={`flex group relative flex-1 max-w-[100%] h-input items-center md:mb-0 ${!justEdit && !editable ? " px-2 rounded border" : ""}  `}
    >
      {justEdit && noDocumentName && (
        <label className="absolute top-[50%] max-w-[100%] text-label-light -translate-y-[50%] w-[100px]">
          No Document
        </label>
      )}

      {!editable && (
        <AppTypo
          variant="headingXS"
          className={`${!justEdit && !editable ? "   " : ""} ${showHover ? "  group-hover:underline  " : " underline  "}  max-w-[100%] me-1 items-center py-1 truncate`}
        >
          {input}
        </AppTypo>
      )}
      {editable && (
        <span
          className="me-1"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Input
            value={input}
            type="text"
            ref={inputRef}
            className={`text-small ${justEdit && uuid === "" ? "invisible" : ""} md:text-base w-full py-1 ${changable ? " pe-6 " : ""}`}
            readOnly={changable && !editable}
            placeholder={placeHolder}
            onBlur={e => {}}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                save();
              }
            }}
            onChange={e => {
              setInput(e.target.value);
              onChange(e.target.value);
            }}
          />
        </span>
      )}
      {uuid !== "" && (
        <div className="">
          {!isPending && !editable && (
            <MinimalButton
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                edit();
              }}
              size="xs"
              className={`${showHover ? " opacity-0 group-hover:opacity-100  " : "  "}`}
              icon="bx:edit"
            />
          )}
          {!isPending && editable && (
            <MinimalButton
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                save();
              }}
              icon="material-symbols:check-rounded"
            />
          )}
          {isPending && (
            <div className="flex justify-center items-center w-5 h-5">
              {" "}
              <Icons.loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
