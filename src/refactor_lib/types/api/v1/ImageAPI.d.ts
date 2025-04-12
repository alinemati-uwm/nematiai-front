export interface ImageAPIRequest {
  openAIGenerateTextToImage: {
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
  openAIGenerateImageToImage: {
    image: File;
  };
  stabilityGenerateTextToImage: {
    model: string;
    text_prompts: [
      {
        text: string;
        weight: number;
      },
    ];
    cfg_scale: number;
    height: number;
    width: number;
    samples: number;
    sampler: string;
    clip_guidance_preset: string;
    style_preset: string;
    steps: number;
  };
}
