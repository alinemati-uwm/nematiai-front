import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";

import type { TemplateAction, TemplateState } from "./types";

type StoreType = TemplateState & TemplateAction;

const initialState: TemplateState = {
  currentTemplate: {
    id: 0,
    topic: "",
    task: "",
    prompt: "",
    params: [],
  },
  customTemplateInputs: [],
  customTemplateDetails: {
    name: "",
    description: "",
    category: {
      name: "",
      id: 0,
    },
    template: "",
    icon: "",
  },
  currentTemplateInputs: {},
  currentTemplatePrompt: "",
};

/**
 * `useTemplate` is a Zustand store that manages the state and actions related to templates.
 * It uses the `create` function from `zustand` to create the store,
 * the `devtools` middleware from `zustand` for Redux DevTools support,
 * and the `immer` middleware from `zustand` for immutability.
 * It also uses the `createSelectors` function to create selectors for the store.
 *
 * The store has the following state:
 * - `currentTemplate`: The current template.
 * - `customTemplateInputs`: The inputs for the custom template.
 * - `customTemplateDetails`: The details of the custom template.
 *
 * The store has the following actions:
 * - `setCurrentTemplate`: Sets the current template.
 * - `setCustomTemplateInputs`: Sets the inputs for the custom template.
 * - `addCustomTemplateOption`: Adds an option to a custom template input.
 * - `setCustomTemplateInputValue`: Sets the value of a custom template input.
 * - `setCustomTemplateInputType`: Sets the type of custom template input.
 * - `deleteCustomTemplateInput`: Deletes a custom template input.
 * - `toggleCustomTemplateInputAdvance`: Toggles the advance setting of a custom template input.
 * - `changeCustomTemplateInputOptionValue`: Changes the value of a custom template input option.
 * - `deleteCustomTemplateInputOption`: Deletes a custom template input option.
 * - `resetCustomTemplate`: Resets the custom template.
 * - `setCustomTemplateDetails`: Sets the details of the custom template.
 *
 * @returns {StoreType} The Zustand store.
 */
const useTemplate = create<StoreType>()(
  devtools(
    immer(set => ({
      ...initialState,
      setCurrentTemplate: v =>
        set(state => {
          state.currentTemplate = v;
        }),
      setCustomTemplateInputs: v =>
        set(state => {
          if (Array.isArray(v)) {
            state.customTemplateInputs = v;
          } else {
            state.customTemplateInputs.push(v);
          }
        }),
      addCustomTemplateOption: (id, v) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            if (Array.isArray(input.options)) {
              input.options!.push(v);
            } else {
              input.options = [v];
            }
          }
        }),
      setCustomTemplateInputValue: (id, key, v) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input[key] = v;
          }
        }),
      setCustomTemplateInputType: (id, type) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.type = type;
          }
        }),
      deleteCustomTemplateInput: id =>
        set(state => {
          state.customTemplateInputs = state.customTemplateInputs.filter(
            input => input.id !== id,
          );
        }),
      toggleCustomTemplateInputAdvance: id =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.isAdvance = !input.isAdvance;
          }
        }),
      changeCustomTemplateInputOptionValue: (id, optionId, value) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            const option = (input.options || []).find(
              option => option.id === optionId,
            );
            if (option) {
              option.value = value;
            }
          }
        }),
      deleteCustomTemplateInputOption: (id, optionId) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.options = (input.options || []).filter(
              o => o.id !== optionId,
            );
          }
        }),
      resetCustomTemplate: () =>
        set(state => {
          state.customTemplateInputs = [];
          state.customTemplateDetails = initialState.customTemplateDetails;
        }),
      setCustomTemplateDetails: (key, v) =>
        set(state => {
          state.customTemplateDetails[key] = v as any;
        }),
      changeCurrentTemplateInputs: (key, val) =>
        set(state => {
          state.currentTemplateInputs[key] = val;
        }),
      resetCurrentTemplateInputs: () =>
        set(state => {
          state.currentTemplateInputs = {};
        }),
      setCurrentTemplatePrompt: val =>
        set(state => {
          state.currentTemplatePrompt = val;
        }),
    })),
    { name: "template", store: "template" },
  ),
);

/**
 * `useTemplateStore` is a function that creates selectors for the `useTemplate` store.
 * It uses the `createSelectors` function to create the selectors.
 *
 * @returns {StoreType} The Zustand store with selectors.
 */
export const useTemplateStore = createSelectors(useTemplate);
