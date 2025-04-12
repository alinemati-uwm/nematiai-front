import {
  type HistoryAPIRequest,
  type HistoryAPIResponse,
} from "@/refactor_lib/types/api/v1/HistoryAPI";

import { axiosClientV1 } from ".";

const DocumentPersonalAPI = {
  basePath: "/histories",
  getAllDocPErsonal: ({ appName }: HistoryAPIRequest["getAllAnswers"]) =>
    axiosClientV1.get<HistoryAPIResponse["getAllAnswers"]>(
      `${DocumentPersonalAPI.basePath}/`,
      { params: { app_type: appName } },
    ),
};

export default DocumentPersonalAPI;
