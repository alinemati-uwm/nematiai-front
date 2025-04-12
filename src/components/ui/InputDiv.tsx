"use client";

import React, { useEffect, useState, type RefObject } from "react";

import { renderToString } from "react-dom/server";

import { cn } from "@/lib/utils";

interface Props {
  divRef: RefObject<HTMLDivElement | null>;
  initialValue?: React.ReactElement<any>;
  className?: string;
  onChange?: (value: string) => void;
  onKeydown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clearContent?: () => void;
  setContent?: (newContent: string) => void;
  placeholder?: string;
  getFromSpeech?: string;
  setSpeech?: (v: string) => void;
  checkPlaceHolder?: string;
  setIsFocused?: (v: boolean) => void;
}

const EditableDiv: React.FC<Props> = ({
  initialValue = <></>,
  setSpeech,
  className = "",
  onKeydown,
  onChange,
  getFromSpeech,
  divRef,
  placeholder = "",
  setIsFocused = () => {},
}) => {
  const [showPlaceholder, setShowPlaceHolder] = useState<boolean>(true);
  const [inputText, setInputText] =
    useState<React.ReactElement<any>>(initialValue);

  useEffect(() => {
    if (divRef.current)
      setShowPlaceHolder(divRef.current.innerText.trim() === "");
  }, [inputText]);

  useEffect(() => {
    if (divRef.current)
      setShowPlaceHolder(divRef.current.innerText.trim() === "");
  }, [initialValue]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = renderToString(initialValue);
      setShowPlaceHolder(divRef.current.innerText.trim() === "");
    }
  }, []);

  // handle cleaning the div by clicking the trash icon
  useEffect(() => {
    if (getFromSpeech !== undefined && getFromSpeech.trim() !== "") {
      onPaste(`${inputText ? " " : ""}${getFromSpeech}`);
      if (setSpeech) setSpeech("");
    }
  }, [getFromSpeech]);

  //split input with space
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const text = (event.target as HTMLElement).innerText;

    if (onChange) {
      onChange(text);
    }
    setInputText(<>{text}</>);

    const placeHolder = divRef.current
      ? divRef.current.innerText.trim() === ""
      : true;

    if (placeHolder !== showPlaceholder) {
      setShowPlaceHolder(placeHolder);
    }
  };

  const onPaste = (pastedText: string) => {
    const selection = window.getSelection();
    const div = divRef.current;

    if (!div) return;

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      const commonAncestor = range.commonAncestorContainer;
      const isWithinDiv = div.contains(commonAncestor);

      if (isWithinDiv) {
        range.deleteContents();
        const newTextNode = document.createTextNode(pastedText);
        range.insertNode(newTextNode);

        range.setStartAfter(newTextNode);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        div.appendChild(document.createTextNode(pastedText));
      }
    } else {
      div.appendChild(document.createTextNode(pastedText));
    }

    if (onChange && div) {
      onChange(div.innerText);
    }

    if (div) {
      setInputText(<>{div.innerText}</>);
    }
  };

  //converted pasted content to text only and insert it to the div
  const onPasteHandler = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    onPaste(e.clipboardData.getData("text"));
  };

  return (
    <div className="w-full min-h-5 h-full overflow-y-auto scrollbar relative ">
      <div
        id="input"
        contentEditable
        onInput={handleInput}
        ref={divRef}
        onKeyDown={onKeydown}
        onPaste={onPasteHandler}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "mb-0  h-full w-full cursor-text   border-0 leading-tight outline-none ring-0 first-line:pl-4 first-line:pt-8 overflow-y-auto",
          className,
        )}
      />
      {showPlaceholder && (
        <div className="absolute h-10 top-0 left-0  flex  text-base  text-label-light pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
};

// Set the display name
EditableDiv.displayName = "EditableDiv";

export default EditableDiv;
