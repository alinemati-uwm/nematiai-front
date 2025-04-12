import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";

import type { EditorActions, EditorState } from "./types";

const initialState: EditorState = {
  isEditorChange: false,
  editorValue: null,
  editorTextContent: "",
  isFullScreen: false,
  edtiorHtml: "",
};
const useEditor = create<EditorState & EditorActions>()(
  devtools(
    immer(set => ({
      ...initialState,
      setEditorChange: () =>
        set(state => {
          state.isEditorChange = !state.isEditorChange;
        }),
      setEditorValue: (v, textContent, htmlContent) =>
        set(state => {
          state.editorValue = v;
          state.editorTextContent = v[0].children[0].text;
          state.edtiorHtml = htmlContent || "";
        }),
      toggleFullScreen: () =>
        set(state => {
          state.isFullScreen = !state.isFullScreen;
        }),
      setIsFullScreen: val =>
        set(state => {
          state.isFullScreen = val;
        }),
    })),
    { name: "editor", store: "editor" },
  ),
);

export const useEditorStore = createSelectors(useEditor);
