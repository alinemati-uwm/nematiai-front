"use client";

import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import { type GenerateDocumentType } from "../types";

/**
 * Component to generate a new document.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setSelectedUUID - Function to set the selected UUID.
 * @param {Function} props.setEditorValue - Function to set the editor value.
 * @param {Function} props.onAftergenerate - Callback function to be called after generating the document.
 * @param {Function} props.setFlagNewDocuemnt - Function to set the flag for a new document.
 * @param {Function} [props.onClick] - Optional click handler function.
 * @param {string} [props.className] - Optional additional class names for the button.
 * @param {boolean} [props.small] - Optional flag to determine the button size.
 * @param {boolean} [props.disabled] - Optional flag to disable the button.
 *
 * @returns {JSX.Element} The rendered component.
 */
const GenerateDocument = ({
  addHandler,
  className = "",
  small,
  disabled,
  onClick,
}: GenerateDocumentType & { small?: boolean }) => {
  const {
    page: { document: lang },
  } = useGetDictionary();

  return (
    <div className="w-full flex gap-2 flex-row ">
      <Button
        disabled={disabled}
        size={small ? "default" : "lg"}
        className={cn("!w-full", className)}
        onClick={() => {
          onClick && onClick();
          addHandler();
        }}
      >
        <AppIcon icon="lets-icons:add-ring" fontSize={20}></AppIcon>
        {lang.Create}
      </Button>
    </div>
  );
};

export default GenerateDocument;
