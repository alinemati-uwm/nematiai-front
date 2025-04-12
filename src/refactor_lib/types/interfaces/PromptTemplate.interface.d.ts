export interface PromptTemplateInput {
  documentName: string;
  frequencyPenalty?: number;
  maxToken?: number;
  userMessage: string;
  model: string;
  presencePenalty?: number;
  stream?: boolean;
  temperature?: number;
  topP?: number;
}

export type PromptTemplateInputWithoutMessage = Omit<
  PromptTemplateInput,
  "userMessage"
>;
