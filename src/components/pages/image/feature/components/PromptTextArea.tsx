"use client";

import { useRef, type CSSProperties } from "react";

import { Label } from "@/components/ui/label";
import usePrompt from "@/components/ui/prompt/Prompt";
import { useGetDictionary } from "@/hooks";

/**
 * Prompt textarea component
 * used for image prompt to generate
 * includes label and textarea and character count
 * @constructor
 */
type props = {
  value?: any;
  setValue?(val: any): void;
  style?: CSSProperties;
  placeholder?: string;
};

function PromptTextArea({
  setValue = () => {}, // Function to update the value (default is an empty function)
  value = "", // Initial value of the textarea (default is an empty string)
  style, // Optional custom style for the component
  placeholder, // Optional placeholder text for the textarea
}: props) {
  // Reference for the editable div used for the prompt text area
  const editableDivRef = useRef(null);

  // Retrieve the dictionary for the page to get prompt labels and placeholders
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  // Custom hook to manage prompt content and actions
  const { content, addText } = usePrompt({
    onGetNewFile: () => {}, // Function to handle getting a new file (currently does nothing)
    key: 1, // Key used to identify the prompt (could be used for unique identification)
    editableDivRef, // Reference to the editable div
    clean: true, // Flag to clean the content (true = clean the content)
    placeholder: placeholder ?? imageDictionary.prompt_placeholder, // Placeholder text, falls back to dictionary if not provided
    upload: false, // Flag to control upload behavior (disabled in this case)
    promptFn: prompt => addText(prompt.trim()), // Function to handle the prompt text (trim the text before adding it)
    maxsize: 1000, // Maximum size for the prompt text
    initialValue: value ?? "", // Initial value of the textarea, falls back to empty string if not provided
    onchange: val => setValue(val), // Callback to update the value when the content changes
  });

  // Render the prompt text area and its label
  return (
    <div className="col gap-label-space">
      {/* Label for the textarea */}
      <Label htmlFor="image-prompt-teaxtarea">
        {imageDictionary.prompt_title} {/* Prompt title from the dictionary */}
      </Label>
      {/* Render the content (textarea or editable div) from the usePrompt hook */}
      {content}
    </div>
  );
}

export default PromptTextArea;
