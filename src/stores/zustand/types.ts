/**
 * ! Warning
 * @deprecated don't use this type directly. All types must be in the types directory'
 */
import { type imageTypes } from "@/components/pages/image/feature/types";
import { type HistoryAPIResponse } from "@/refactor_lib/types/api/v1/HistoryAPI";
import { type ModelItem, type TemplateItem } from "@/services/types";
import { type AppTheme } from "@/types/theme";

export type typeInfoMenuBottomSheet = {
  apply?: boolean;
  active?: boolean;
  open?: boolean;
};

export interface IUiState {
  isSidePanelOpen: boolean;
  isHoverOnSidePanel: boolean;
  aiModalIsOpen: boolean;
  aiOptionSelected: string;
  aiGenerateLang: string;
  selectedTextInEditor: string;
  aiModalHeight: number;
  infoBottomSheet: typeInfoMenuBottomSheet;
  setIsHoverOnSidePanel: (val: boolean) => void;
  setInfoBottomSheet: (val: typeInfoMenuBottomSheet) => void;
  setIsSidePanelOpen: (val: boolean) => void;
  toggleIsSidePanelOpen: () => void;
  openUserPanelDialog: boolean;
  setOpenUserPanelDialog: (val: boolean) => void;
  userPanelActiveMenu: string;
  setUserPanelActiveMenu: (val: string) => void;
  activeTheme: AppTheme;
  setActiveTheme: (val: AppTheme) => void;
  isLandingDrawerOpen: boolean;
  setIsLandingDrawerOpen: (val: boolean) => void;
  setAiModalOpen: (val: boolean) => void;
  setSelectedTextInEditor: (val: string) => void;
  setAiOptionSelected: (val: string) => void;
  setAiModalHeight: (val: number) => void;
  setAiGenerateLang: (val: string) => void;
}

//editor
export interface EditorState {
  isEditorChange: boolean;
  editorValue: any;
  editorTextContent: string;
  isFullScreen: boolean;
  edtiorHtml: string;
}
export interface EditorActions {
  setEditorChange: () => void;
  setEditorValue: (v: any, textContent: string, html?: string) => void;
  toggleFullScreen: () => void;
  setIsFullScreen: (val: boolean) => void;
}

export type DynamicInputType =
  | "text"
  | "textarea"
  // | "date"
  | "select"
  | "number"
  | "list"
  | "range";

export interface DynamicInputOption {
  id: string;
  value: string;
}

export interface DynamicInput {
  id: string;
  name?: string;
  description: string;
  placeholder?: string;
  defaultValue?: string;
  order: number;
  type: DynamicInputType;
  options?: DynamicInputOption[];
  isAdvance?: boolean;
  fieldKey?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface TemplateState {
  currentTemplate: TemplateItem;
  customTemplateInputs: DynamicInput[];
  currentTemplateInputs: { [key: string]: string | number };
  currentTemplatePrompt: string;
  customTemplateDetails: {
    name: string;
    description: string;
    category: {
      name: string;
      id: number;
    };
    icon: string;
    template: string;
  };
}
export interface TemplateAction {
  setCurrentTemplate: (v: TemplateItem) => void;
  setCustomTemplateInputs: (v: DynamicInput | DynamicInput[]) => void;
  addCustomTemplateOption: (
    id: string,
    v: {
      id: string;
      value: string;
    },
  ) => void;
  setCustomTemplateInputValue: (
    id: string,
    key: "name" | "description" | "placeholder" | "defaultValue",
    v: string,
  ) => void;
  setCustomTemplateInputType: (id: string, type: DynamicInputType) => void;
  deleteCustomTemplateInput: (id: string) => void;
  toggleCustomTemplateInputAdvance: (id: string) => void;
  changeCustomTemplateInputOptionValue: (
    id: string,
    optionId: string,
    value: string,
  ) => void;
  deleteCustomTemplateInputOption: (id: string, optionId: string) => void;
  resetCustomTemplate: () => void;
  setCustomTemplateDetails: (
    key: "name" | "description" | "category" | "icon" | "template",
    v:
      | string
      | {
          name: string;
          id: number;
        },
  ) => void;
  changeCurrentTemplateInputs: (key: string, val: string | number) => void;
  resetCurrentTemplateInputs: () => void;
  setCurrentTemplatePrompt: (val: string) => void;
}

export type engineSettingState = Record<
  string,
  { top: number; temperature: number; presence: number; frequency: number }
>;
export interface FormSectionState {
  engines: engineSettingState | null;
  totalEngines: string[];
  selectedEngine: string;
}
export type settingModelNames =
  | "top"
  | "temperature"
  | "presence"
  | "frequency";
export interface FormSectionAction {
  handleEngineSetting: (
    engineName: string,
    settingName: settingModelNames,
    value: number | string,
  ) => void;
  initialEngine: (v: string[]) => void;
  setSelectedEngine: (val: string) => void;
  setTotalEngines: (v: string[]) => void;
}

export interface HistoryState {
  isHistoryOpen: boolean;
  isGrammarHistoryOpen: boolean;

  historyUpdateIsPending: boolean;
  historyUpdateIsSuccess: boolean;
  historyUpdateIsError: boolean;

  historySearch: string;
  isHistoryInfoOpen: boolean;
  selectedHistoryItem: Answer | null;
  data: HistoryAPIResponse["getAllAnswers"];
}

export interface WorkspaceState {
  workspaceID: number;
  setWorkspaceID: (v: number) => void;
  setDocumentName: (v: string) => void;
  documentName: string;
}

export interface HistoryAction {
  setHistoryIsOpen: (v: boolean) => void;
  setGrammarHistoryIsOpen: (v: boolean) => void;
  setHistorySearch: (v: string) => void;
  setSelectHistoryItem: (v: Answer | null) => void;
  resetHistory: () => void;
  setHistoryInfoOpen: (v: boolean) => void;

  setHistoryUpdateIsPending: (v: boolean) => void;
  setHistoryUpdateIsSuccess: (v: boolean) => void;
  setHistoryUpdateIsError: (v: boolean) => void;
  setHistoryUpdateData: (v: HistoryAPIResponse["getAllAnswers"]) => void;
}

export type AiImageState = {
  models: Record<imageTypes, ModelItem[]>;
};

export type ImageModelType =
  | "text_to_image"
  | "image_to_image"
  | "image_upscale";

export interface conversation {
  id: string;
  prompt: string[];
  image: string;
  timeLine?: string;
  name: string;
  role: string;

  setConversation(val: Partial<conversation>): void;
}
