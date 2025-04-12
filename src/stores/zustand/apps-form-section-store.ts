import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";

import type { FormSectionAction, FormSectionState } from "./types";

type StoreType = FormSectionState & FormSectionAction;

const initialValue = {
  temperature: 0.2,
  frequency: 0,
  presence: 0,
  top: 1,
};

const initialState: FormSectionState = {
  engines: null,
  selectedEngine: "",
  totalEngines: ["gpt-4o-mini"],
};

const useForm = create<StoreType>()(
  devtools(
    immer(set => ({
      ...initialState,
      handleEngineSetting: (engineName, settingName, value) =>
        set(state => {
          if (state.engines) {
            if (state.engines[engineName]) {
              state.engines[engineName][settingName] = +value;
            } else {
              state.engines[engineName] = initialValue;
              state.engines[engineName][settingName] = +value;
            }
          }
        }),
      initialEngine: (TotalEngines: string[]) =>
        set(state => {
          state.engines = TotalEngines.reduce(
            (prev, cur) => {
              prev[cur] = initialValue;
              return prev;
            },
            {} as Record<string, typeof initialValue>,
          );
        }),

      setSelectedEngine: engine =>
        set(state => {
          state.selectedEngine = engine;
        }),
      setTotalEngines: engine =>
        set(state => {
          state.totalEngines = engine;
        }),
    })),
    { name: "form-section", store: "form-section" },
  ),
);

export const useFormStore = createSelectors(useForm);
