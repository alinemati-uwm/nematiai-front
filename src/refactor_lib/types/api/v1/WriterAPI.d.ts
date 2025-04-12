export interface WriterAPIRequest {
  generateAIWriter: {
    document_name: string;
    frequency_penalty: number;
    max_tokens: number;
    // messages: [
    //   {
    //     content: string;
    //     role: string;
    //   },
    //   {
    //     content: string;
    //     role: string;
    //   },
    // ];
    messages: Array<{ content: string; role: string }>;
    model: string;
    presence_penalty: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    workspace_id: number;
  };
}
