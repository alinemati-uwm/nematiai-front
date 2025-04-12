import { type Value } from "@udecode/slate";

// actions.ts
export type Action = {
  type: "SET_STATE";
  listStates: Record<string, any>;
};

// reducer.ts
export type EditorState = {
  valueEditor: Value | null;
  text: string | null;
  initialValueEditor: Value;
};

export const reducerEditor = (
  state: EditorState,
  action: Action,
): EditorState => {
  switch (action.type) {
    case "SET_STATE": {
      return { ...state, ...action.listStates };
    }
    default:
      return state;
  }
};
