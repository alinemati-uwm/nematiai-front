export interface CodeAPIRequest {
  generateCode: {
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
}
