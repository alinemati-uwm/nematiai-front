"use client";

import React, { memo, useContext, useEffect, useRef, useState } from "react";

import { Plate } from "@udecode/plate-common/react";
import { type Value } from "@udecode/slate";
import { debounce } from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CheckTypeValue, extractTextWithSpacing } from "@/lib/utils";
import { useEditorContext } from "@/stores/contexts/useEditorContext";
import editorAiImpovementPrompt from "@/refactor_lib/constants/editorAiImpovementPrompt";
import useStreamAiEditor from "@/refactor_lib/hooks/mutations/useStreamAiEditor";
import useGetAppTypeEngines from "@/refactor_lib/hooks/shared/useGetAppTypeEngines";

import { Editor, EditorContainer } from "../plate-ui/editor";
import { DocumentEditorContext } from "../shared/grammar_translate_rewrite/component/editor/context";
import { useCreateEditor } from "./use-create-editor";

interface IProps {
  readonly: boolean;
  initialValue: Value;
  onChangeEditorValue: (v: Value, lockOnChange: boolean) => void;
  isActiveEditor: boolean;
}

export const testValueEditor = (val: Value): boolean => {
  return CheckTypeValue(val);
};

const PlateEditorResponse = ({
  initialValue,
  onChangeEditorValue,
  isActiveEditor,
  readonly = false,
}: IProps) => {
  const { textareaEditorDivRef } = useEditorContext();
  const [textInputOfSlash, setTextInputOfSlash] = useState<string>("");
  // const editorTextContentValue = useEditorStore.use.editorTextContent();

  const lockOnChange = useRef<boolean>(false);
  const setLockOnchange = (val: boolean) => {
    lockOnChange.current = val;
  };
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //generate function service
  const { mutate: generateAiEditor, responseMessage: textInput } =
    useStreamAiEditor();

  useEffect(() => {
    setTextInputOfSlash(prev => {
      let new_value = textInput;
      if (prev !== "" && new_value.startsWith(prev)) {
        new_value = new_value.slice(prev.length); // حذف b از ابتدای a
      }

      editor.insertText(new_value);
      return textInput;
    });
    //editor.tf.select()
    // 	Transforms.insertText(editorRef.current as BaseEditor, textInput);
  }, [textInput]);

  const { engines: appTypeEngines } = useGetAppTypeEngines({
    GetAllModels: { modelName: "CHAT_BOT" },
  });
  const model = useRef<string>("");

  useEffect(() => {
    model.current = appTypeEngines[0];
  }, [appTypeEngines]);

  const generateMessage = (text: string) => {
    generateAiEditor({
      body: editorAiImpovementPrompt.createChatInEditor({
        documentName: "editor",
        model: model.current,
        userMessage: text,
        maxToken: 500,
        temperature: 0.1,
        frequencyPenalty: 0,
        presencePenalty: 0,
        topP: 0,
      }),
    });
  };

  const editor = useCreateEditor({ generateMessage });

  useEffect(() => {
    let content = initialValue;
    // Check if content is not empty and has the expected structure
    if (
      content &&
      content.length <= 1 &&
      content[0] &&
      content[0].type === "p" &&
      content[0].children &&
      content[0].children[0]
    ) {
      try {
        content = editor.api.markdown.deserialize(
          content[0].children[0].text as string,
        );
      } catch (error) {
        console.error("Error deserializing content:", error);
        // If deserialization fails, fall back to initialValue
        content = initialValue;
      }
    }

    // Set value in editor
    editor.tf.setValue(content);

    setLockOnchange(true);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setLockOnchange(false);
    }, 1000);
  }, [initialValue]);

  const { editorDispatch } = useContext(DocumentEditorContext);

  // Define debounce functions outside of the handleEditorChange
  const debouncedSetValueEditor = debounce((dispatch, v) => {
    dispatch({
      type: "SET_STATE",
      listStates: { valueEditor: v },
    });
  }, 300);

  const debouncedSetText = debounce((dispatch, v, extractTextWithSpacing) => {
    dispatch({
      type: "SET_STATE",
      listStates: { text: extractTextWithSpacing(v[0]) },
    });
  }, 300);

  const handleEditorChange = ({ value }: { value: any }) => {
    onChangeEditorValue([value] as Value, lockOnChange.current);
    debouncedSetValueEditor(editorDispatch, [value]);
    debouncedSetText(editorDispatch, [value], extractTextWithSpacing);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={handleEditorChange}>
        <EditorContainer className="col">
          <Editor
            variant="demo"
            {...(isActiveEditor && {
              ref: textareaEditorDivRef,
            })}
            readOnly={readonly}
            className={
              "mx-auto px-16  min-h-80 lg:min-h-[55dvh] xl:min-h-[65dvh] "
              // editorTextContentValue.length <= 135
              // 	? " mx-auto h-[300px] !bg-red-600 sm:h-auto px-16"
              // 	: " mx-auto  px-16"
            }
          />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
};

PlateEditorResponse.displayName = "PlateEditor";
export const PlateEditor = memo(PlateEditorResponse);
