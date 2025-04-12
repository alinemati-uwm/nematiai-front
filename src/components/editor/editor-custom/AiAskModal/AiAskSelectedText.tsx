import React, { useEffect } from "react";

import { useEditorState } from "@udecode/plate-common/react";

import EditableDiv from "@/components/ui/InputDiv";

import { AiAskPlugin } from "./AiAskPlugin";

export default function AiAskSelectedText({
  inputTextRef,
  setInputText,
}: {
  inputTextRef: React.RefObject<HTMLDivElement | null> | null;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const editor = useEditorState();

  useEffect(() => {
    if (inputTextRef) {
      editor.setOption(AiAskPlugin, "inputTextRef", inputTextRef);
    }
  }, []);

  return (
    <div>
      {inputTextRef && (
        <div className=" w-full p-2 relative flex flex-col items-end  border rounded bg-input max-h-[100px] ">
          <EditableDiv
            className=" min-h-3"
            initialValue={<></>}
            divRef={inputTextRef}
            placeholder=""
            onChange={value => {
              setInputText(value);
            }}
          />
        </div>
      )}
    </div>
  );
}
