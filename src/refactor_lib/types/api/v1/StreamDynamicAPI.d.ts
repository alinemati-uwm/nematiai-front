// {
// 	format?: string;
// 	language?: string;
// 	length?: string;
// 	point_of_view?: string;
// 	tone_of_voice?: string;
// }
export interface StreamDynamicTypeAPI {
  app_type?: AppsType;
  message?: string;
  model: string;
  prompt_context?: Record<string, string>;
  prompt_type?: AppsType | string;
  setting: {
    frequency_penalty: number;
    presence_penalty: number;
    temperature: number;
    top_p: number;
  };
}
