"use client";

import { type Value } from "@udecode/slate";

import { PlateEditor } from "@/components/editor/editor";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

type Props = {
  initialValue: Value;
  onChange: (text: Value, lockOnChange: boolean) => void;
  readonly: boolean;
};

export default function Editor({ readonly, initialValue, onChange }: Props) {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  const onEdite = (doc: any, lockOnChange: boolean) => {
    // doc[0][0].children[0].text;
    if (doc && doc[0]) {
      onChange(doc[0], lockOnChange);
    }
  };
  return (
    <div ref={editorAndFooterButtonsWrapperRef} className=" h-full col">
      <PlateEditor
        key="EditorWithNoRerender"
        readonly={readonly}
        isActiveEditor
        initialValue={initialValue}
        onChangeEditorValue={onEdite}
      />
    </div>
  );
}
