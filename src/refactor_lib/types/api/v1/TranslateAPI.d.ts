export interface TranslateAPIRequest {
  generateTranslate: {
    document_name: string;
    frequency_penalty: number;
    max_tokens: number;
    messages: Array<{
      content: string;
      role: string;
    }>;
    model: string;
    presence_penalty: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    workspace_id: number;
  };
  googleTranslate: {
    text_to_translate: string;
    dest_language: string;
  };
}
