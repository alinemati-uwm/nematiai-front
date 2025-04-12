export interface AIAction {
  id: string;
  title: string;
  titleI18n:
    | "explain"
    | "rewrite"
    | "translate"
    | "summarize"
    | "shorter"
    | "longer"
    | "grammar"
    | "tone";
  settingTitleI18n?: "tone_to" | "translate_to";
  promptTemplate?: string;
  options: string[];
  icon: string;
  isPin: boolean;
  promptAction: string;
  promptType: string;
  optionKey?: string;
  selectedOption?: string;
}

export interface AIOptionGenerateData {
  actionId: string;
  selectedOption?: string;
  selectedText?: string;
}
