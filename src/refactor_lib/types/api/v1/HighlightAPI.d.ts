export interface highlightAPIRequest {
  message: string;
  model: string;
  prompt_context: {
    type: string;
  };
  prompt_type: string;
  setting: {
    frequency_penalty: number;
    presence_penalty: number;
    temperature: number;
    top_p: number;
  };
}
