import { type AxiosRequestConfig } from "axios";

import {
  type TemplateAPIRequest,
  type TemplateAPIResponse,
} from "@/refactor_lib/types/api/v1/TemplateAPI";

import { axiosClientV1, createFetchEventSourceClientV1 } from ".";

const templateAPI = {
  basePath: "/templates",
  generateTemplate: createFetchEventSourceClientV1<
    TemplateAPIRequest["generateTemplate"]
  >("/templates/generate_template/"),
  getTemplatesByCategoryName: (
    data: TemplateAPIRequest["getTemplatesByCategoryName"],
    requestConfig: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<TemplateAPIResponse["getTemplatesByCategoryName"]>(
      `${templateAPI.basePath}/categories/`,
      data,
      requestConfig,
    ),
  getAllCategories: () =>
    axiosClientV1.get<TemplateAPIResponse["getAllCategoriesTypes"][]>(
      `${templateAPI.basePath}/categories/`,
    ),
  detail: ({ template_id, template_type }: TemplateAPIResponse["detail"]) =>
    axiosClientV1.get<TemplateAPIResponse["allTemplates"]>(
      `${templateAPI.basePath}/template/detail`,
      { params: { template_id, template_type } },
    ),
  allTemplates: ({
    category_id,
    limit,
    offset,
    search,
  }: TemplateAPIRequest["allTemplates"]) => {
    return axiosClientV1.get<TemplateAPIResponse["allTemplates"][]>(
      `${templateAPI.basePath}/get_all_templates`,
      {
        params: {
          limit: limit?.toString(),
          category_id: category_id?.toString(),
          offset: typeof offset !== "undefined" && offset?.toString(),
          search: search?.toString(),
        },
      },
    );
  },
  createNewPublicTemplate: (
    data: TemplateAPIRequest["createNewPublicTemplate"],
    requestConfig: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<TemplateAPIResponse["createNewPublicTemplate"]>(
      `${templateAPI.basePath}/`,
      data,
      requestConfig,
    ),
  getParentCategories: () =>
    axiosClientV1.get<TemplateAPIResponse["getParentCategories"]>(
      `${templateAPI.basePath}/parent_categories/`,
    ),
  getChildCategoriesByParentId: (parentId: number) =>
    axiosClientV1.get<TemplateAPIResponse["getChildCategoriesByParentId"]>(
      `${templateAPI.basePath}/child_categories/${parentId}/child/`,
    ),
  getTemplateByChildIdAndParentId: (parentId: number, childId: number) =>
    axiosClientV1.get<TemplateAPIResponse["getTemplateByChildIdAndParentId"]>(
      `${templateAPI.basePath}/child_categories/${parentId}/child/${childId}/templates/`,
    ),
  getTemplateDetail: (templateId: number) =>
    axiosClientV1.get<TemplateAPIResponse["getTemplateDetail"]>(
      `${templateAPI.basePath}/${templateId}/detail/`,
    ),
  getAllGeneralTemplates: (page: number = 1) =>
    axiosClientV1.get<TemplateAPIResponse["getAllGeneralTemplates"]>(
      `${templateAPI.basePath}/generals/`,
      {
        params: {
          page,
        },
      },
    ),
  getGeneralTemplateDetail: (templateId: number) =>
    axiosClientV1.get<TemplateAPIResponse["getGeneralTemplateDetail"]>(
      `${templateAPI.basePath}/generals/${templateId}/detail/`,
    ),
  favorite: (props: TemplateAPIRequest["favorite"]) =>
    axiosClientV1.post(`${templateAPI.basePath}/favorite/`, props),
};

export default templateAPI;
