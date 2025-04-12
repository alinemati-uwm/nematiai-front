"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { IUiState } from "@/stores/zustand/types";
import { type typeInfoMenuBottomSheet } from "@/stores/zustand/types";
import { accountSettingsItems } from "@/constants/user-panel";
import { type AppTheme } from "@/types/theme";

import { createSelectors } from "./createSelectors";

const initialState = {
  isSidePanelOpen: true,
  isHoverOnSidePanel: false,
  infoBottomSheet: {
    apply: false,
    active: false,
    open: false,
  },
  isOpenImageHistory: false,
  openUserPanelDialog: false,
  userPanelActiveMenu: accountSettingsItems[0].key,
  activeTheme: "default" as AppTheme,
  isLandingDrawerOpen: false,
  aiModalIsOpen: false,
  selectedTextInEditor: "",
  aiOptionSelected: "Expand",
  aiModalHeight: 350,
  aiGenerateLang: "English",
};

//for all the componets related states like open dialogs

const useUi = create<IUiState>()(
  devtools(
    immer(set => ({
      ...initialState,
      setIsHoverOnSidePanel: val =>
        set(state => {
          state.isHoverOnSidePanel = val;
        }),
      setInfoBottomSheet: (val: typeInfoMenuBottomSheet) =>
        set(state => {
          state.infoBottomSheet = { ...state.infoBottomSheet, ...val };
        }),
      setIsSidePanelOpen: (val: boolean) =>
        set(state => {
          state.isSidePanelOpen = val;
        }),
      toggleIsSidePanelOpen: () =>
        set(state => {
          state.isSidePanelOpen = !state.isSidePanelOpen;
        }),
      setOpenUserPanelDialog: (val: boolean) =>
        set(state => {
          state.openUserPanelDialog = val;
        }),

      setUserPanelActiveMenu: (val: string) => {
        set(state => {
          state.userPanelActiveMenu = val;
        });
      },
      setActiveTheme: val => {
        set(state => {
          state.activeTheme = val;
        });
      },
      setIsLandingDrawerOpen: val =>
        set(state => {
          state.isLandingDrawerOpen = val;
        }),
      setAiModalOpen: val =>
        set(state => {
          state.aiModalIsOpen = val;
        }),
      setSelectedTextInEditor: val =>
        set(state => {
          state.selectedTextInEditor = val;
        }),
      setAiOptionSelected: val =>
        set(state => {
          state.aiOptionSelected = val;
        }),
      setAiModalHeight: val =>
        set(state => {
          state.aiModalHeight = val;
        }),
      setAiGenerateLang: val =>
        set(state => {
          state.aiGenerateLang = val;
        }),
    })),
    { name: "ui", store: "ui" },
  ),
);

export const useUiStore = createSelectors(useUi);
