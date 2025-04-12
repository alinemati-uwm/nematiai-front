import {
  ADVANCED_PROMPT_OPTIONS_CREATIVITY_LEVEL,
  ADVANCED_PROMPT_OPTIONS_Format,
  ADVANCED_PROMPT_OPTIONS_Length,
  ADVANCED_PROMPT_OPTIONS_POINT_OF_VIEW,
  ADVANCED_PROMPT_OPTIONS_RESPONSE_LANGUAGES,
  ADVANCED_PROMPT_OPTIONS_TONE,
} from "@/refactor_lib/constants/advancedPromptOptions";

type StateInfoCreateDocument = {
  language: string;
  creativityLevel: string;
  pointOfView: string;
  tone: string;
  documentName: string;
  format: string;
  length: string;
};
type ActionInfoCreateDocument = {
  type: "SET_STATE";
  listStates: Partial<StateInfoCreateDocument>;
};

export type typeStateAndDispatchCreateDocument = {
  dispatch: React.Dispatch<ActionInfoCreateDocument>;
  state: StateInfoCreateDocument;
};

export const infoCreateDocumentDefault = {
  language: ADVANCED_PROMPT_OPTIONS_RESPONSE_LANGUAGES[0].value,
  creativityLevel: ADVANCED_PROMPT_OPTIONS_CREATIVITY_LEVEL[0],
  pointOfView: ADVANCED_PROMPT_OPTIONS_POINT_OF_VIEW[0],
  tone: ADVANCED_PROMPT_OPTIONS_TONE[0],
  documentName: "",
  format: ADVANCED_PROMPT_OPTIONS_Format[0],
  length: ADVANCED_PROMPT_OPTIONS_Length[0],
};

export const infoCreateDocument = (
  state: StateInfoCreateDocument,
  action: ActionInfoCreateDocument,
): StateInfoCreateDocument => {
  switch (action.type) {
    case "SET_STATE": {
      return { ...state, ...action.listStates };
    }
    default:
      return state;
  }
};
