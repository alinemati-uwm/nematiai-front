import { type AxiosRequestConfig } from "axios";

import { type GeneralAPIRequest } from "@/refactor_lib/types/api/v1/GeneralAPI";

import { axiosClientV1 } from ".";

const generalAPI = {
  basePath: "/general",
  stopGenerate: (
    data: GeneralAPIRequest["stopGenerate"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post(
      `${generalAPI.basePath}/generate_stop/`,
      data,
      requestConfig,
    ),
};

export default generalAPI;
