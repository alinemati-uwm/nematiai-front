import { createContext, type Dispatch } from "react";

import { type Action, type EditorState } from "./reducer";

type editorState = {
  editorDispatch: Dispatch<Action>;
} & EditorState;

export const DocumentEditorContext = createContext<editorState>(
  {} as editorState,
);
