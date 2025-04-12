import { type ModelName } from "@/services/models";

export interface ModelAPIResponse {
  getAllModels: Array<{
    icon: string;
    models: {
      commercial: boolean;
      pricey: boolean;
      description: string;
      icon: string;
      name: string;
      price: number;
      input_token: number;
      output_token: number;
      context_windows: number;
      max_token: number;
      value: string;
    }[];
    name: string;
    total_generate_models: number;
  }>;
}

export interface ModelAPIRequest {
  modelName?: ModelName | null;
}
