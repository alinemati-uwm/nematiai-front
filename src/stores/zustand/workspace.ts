import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";
import { type WorkspaceState } from "@/stores/zustand/types";

const initialState = {
  workspaceID: 0,
  documentName: "new document",
} as WorkspaceState;

const useWorkspace = create<WorkspaceState>()(
  devtools(
    immer(set => ({
      ...initialState,
      setWorkspaceID: v =>
        set(state => {
          state.workspaceID = v;
        }),
      setDocumentName: v =>
        set(state => {
          state.documentName = v;
        }),
    })),
    { name: "workspace", store: "workspace" },
  ),
);

export const useWorkspaceStore = createSelectors(useWorkspace);
