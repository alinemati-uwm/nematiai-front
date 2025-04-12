import { type DynamicInputType } from "@/stores/zustand/types";

export type template_type =
  | "PublicTemplate"
  | "CustomTemplate"
  | "GeneralTemplate"
  | "UserGeneralTemplate";

export interface TemplateAPIRequest {
  generateTemplate: {
    document_name: string;
    frequency_penalty: number;
    max_tokens: number;
    messages: [
      {
        content: string;
        role: string;
      },
      {
        content: string;
        role: string;
      },
    ];
    model: string;
    presence_penalty: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    workspace_id: number;
  };
  getTemplatesByCategoryName: {
    category_name: string;
  };
  createNewPublicTemplate: {
    topic: string;
    task: string;
    prompt: string;
    params: Array<object>;
    category_id: number;
  };
  favorite: {
    template_id: number;
    is_favorite: boolean;
    template_type: string;
  };
  allTemplates: {
    limit?: number;
    offset?: number;
    category_id?: number | null;
    search?: string | null;
  };
}

export interface TemplateAPIResponse {
  getTemplatesByCategoryName: Array<{
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: Array<object>;
    status: string;
  }>;
  createNewPublicTemplate: {
    category_id: number;
    template: {
      id: number;
      topic: string;
      task: string;
      prompt: string;
      params: Array<object>;
      status: string;
    };
  };
  getParentCategories: Array<{
    id: number;
    name: string;
  }>;
  getChildCategoriesByParentId: Array<{
    id: number;
    name: string;
  }>;
  getTemplateByChildIdAndParentId: Array<{
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: Array<object>;
    status: string;
  }>;
  getTemplateDetail: {
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: Array<object>;
    status: string;
  };
  getAllGeneralTemplates: Array<{
    id: number;
    topic: string;
    task: string;
  }>;
  getGeneralTemplateDetail: {
    id: number;
    topic: string;
    task: string;
    prompt: string;
  };
  getAllCategoriesTypes: {
    id: number;
    name: string;
    icon: null;
  };
  allTemplates: {
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: {
      Type: DynamicInputType;
      Label: string;
      Description: string;
      Placeholder: string;
    }[];
    status: string;
    template_type: template_type;
    is_favorite: boolean;
  };
  detail: {
    template_id: number;
    template_type;
  };
}
