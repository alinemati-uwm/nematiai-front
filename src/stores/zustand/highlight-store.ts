import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";

const initialState: HighlightState = {
  isHighlightOpen: false,
  messages: {
    instagram: [],
    tiktok: [],
    linkedin: [],
    youtube: [],
    telegram: [],
    whatsapp: [],
    facebook: [],
    meta: [],
    summary: [],
  },
  name: "",
  role: "",
  prompts: [],
  image: "",
  timeLine: "",
};

const useHighlight = create<HighlightState & HighlightAction>()(
  devtools(
    immer(set => ({
      ...initialState,
      setHighlightIsOpen: isOpen =>
        set(state => {
          state.isHighlightOpen = isOpen;
        }),
      setGeneratedHighlight: (index, v) =>
        set(state => {
          // console.log("store", v);
          const [key] = Object.keys(v) as HighlightType[];
          const newState = { ...(state.messages ?? {}) };
          newState[key as keyof HighlightMessage][index] +=
            v[key as keyof Partial<HighlightMessage>]?.[0];
          state.messages = newState;
        }),
      setSelectedMessageForHighlight: v =>
        set(state => {
          state.prompts?.push(v);
        }),
    })),

    { name: "highlight", store: "highlight" },
  ),
);

const useHighlightStore = createSelectors(useHighlight);
export default useHighlightStore;
