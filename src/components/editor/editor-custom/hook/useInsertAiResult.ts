import { useEditorState } from "@udecode/plate-common/react";

export const useInsertAiResult = (currentAnswer: string) => {
  const editor = useEditorState();
  const handleReplace = () => {
    editor.insertText(currentAnswer);
  };

  const handleInsert = () => {
    if (editor && editor.selection) {
      const pointAfterSelection = editor.end(editor.selection);
      if (pointAfterSelection) {
        const newRange = {
          anchor: pointAfterSelection,
          focus: pointAfterSelection,
        };
        editor.select(newRange);
        editor.insertText(currentAnswer, { at: newRange });
      }
    }
  };

  return { handleReplace, handleInsert };
};
