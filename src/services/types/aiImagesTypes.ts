export type textToImageServiceTypes = {
  params: {
    document_name: string;
    model: string;
    n: number;
    prompt: string;
    quality: string;
    response_format: string;
    size: string;
    style: string;
    workspace_id: number;
  };
  response: Record<string, string>;
};

export type imageToImageServiceTypes = {
  params: {
    generate_data: {
      document_name: string;
      model: string;
      n: number;
      prompt: string;
      text_prompts?: {
        text: string;
      }[];
      response_format: string;
      size: string;
      workspace_id: number;
    };
    image: File;
  };
  response: Record<string, string>;
};

export type imageUpscaleServiceTypes = {
  params: {
    generate_data: {
      model: string;
      width: string;
      height: number;
    };
    image: File;
  };
  response: string[];
};
