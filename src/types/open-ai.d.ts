interface OpenAiCompletionSchemaInput {
  generate_data: {
    model: string;
    messages: OpenAiMessage[];
    temperature: number;
    max_tokens: number;
    stream?: boolean;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    workspace_id: number;
    document_name?: string;
  };
}

interface OpenAiMessage {
  role: "user" | "assistant";
  content: string;
}

interface OpenAiCompletionParams {
  generate_data: Omit<
    OpenAiCompletionSchemaInput["generate_data"],
    "stream" | "messages" | "workspace_id"
  >;
}
