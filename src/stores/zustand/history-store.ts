import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";
import type { HistoryAction, HistoryState } from "@/stores/zustand/types";

const initialState = {
  isHistoryOpen: false,
  historySearch: "",
  selectedHistoryItem: null,
  isHistoryInfoOpen: false,
  isGrammarHistoryOpen: false,
  historyUpdateIsPending: false,
  historyUpdateIsSuccess: false,
  historyUpdateIsError: false,
  data: { histories: [] },
} as HistoryState;

const useHistory = create<HistoryState & HistoryAction>()(
  devtools(
    immer(set => ({
      ...initialState,
      setHistoryIsOpen: v =>
        set(state => {
          state.isHistoryOpen = v;
        }),
      setGrammarHistoryIsOpen: v =>
        set(state => {
          state.isGrammarHistoryOpen = v;
        }),
      setHistorySearch: v =>
        set(state => {
          state.historySearch = v;
        }),
      setSelectHistoryItem: v =>
        set(state => {
          state.selectedHistoryItem = v;
        }),
      setHistoryInfoOpen: v =>
        set(state => {
          state.isHistoryInfoOpen = v;
        }),
      resetHistory: () => {
        set(initialState);
      },
      setHistoryUpdateIsPending: v =>
        set(state => {
          state.historyUpdateIsPending = v;
        }),
      setHistoryUpdateIsSuccess: v =>
        set(state => {
          state.historyUpdateIsSuccess = v;
        }),
      setHistoryUpdateIsError: v =>
        set(state => {
          state.historyUpdateIsError = v;
        }),
      setHistoryUpdateData(v) {
        set(state => {
          state.data = v;
        });
      },
    })),
    { name: "history", store: "history" },
  ),
);

export const useHistoryStore = createSelectors(useHistory);
