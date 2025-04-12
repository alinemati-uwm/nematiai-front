import { type AxiosRequestConfig } from "axios";

import {
  type HistoryAPIRequest,
  type HistoryAPIResponse,
} from "@/refactor_lib/types/api/v1/HistoryAPI";

import { axiosClientV1 } from ".";

const historyAPI = {
  basePath: "/histories",
  getAllAnswers: ({ appName }: HistoryAPIRequest["getAllAnswers"]) =>
    axiosClientV1.get<HistoryAPIResponse["getAllAnswers"]>(
      `${historyAPI.basePath}/`,
      { params: { app_type: appName } },
    ),
  updateAnswerByUUID: (
    UUID: string,
    data: HistoryAPIRequest["updateAnswerByUUID"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.put<HistoryAPIResponse["updateAnswerByUUID"]>(
      `${historyAPI.basePath}/update/${UUID}/`,
      data,
      requestConfig,
    ),
  deleteAnswerByUUID: (UUID: string, requestConfig?: AxiosRequestConfig) =>
    axiosClientV1.delete<HistoryAPIResponse["deleteAnswerByUUID"]>(
      `${historyAPI.basePath}/delete_history/?history_uuid=${UUID}`,
      requestConfig,
    ),
  getAllFavoriteAnswers: (requestConfig?: AxiosRequestConfig) =>
    axiosClientV1.get<HistoryAPIResponse["getAllFavoriteAnswers"]>(
      `${historyAPI.basePath}/favorites/`,
      requestConfig,
    ),
  addAnswerToFavorite: (
    data: HistoryAPIRequest["addAnswerToFavorite"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<HistoryAPIResponse["addAnswerToFavorite"]>(
      `${historyAPI.basePath}/favorites/`,
      data,
      requestConfig,
    ),
  getAllPinnedAnswers: (requestConfig?: AxiosRequestConfig) =>
    axiosClientV1.get<HistoryAPIResponse["getAllPinnedAnswers"]>(
      `${historyAPI.basePath}/pins/`,
      requestConfig,
    ),
  addAnswerToPin: ({
    data,
    requestConfig,
  }: {
    data: HistoryAPIRequest["addAnswerToPin"];
    requestConfig?: AxiosRequestConfig;
  }) =>
    axiosClientV1.post<HistoryAPIResponse["addAnswerToPin"]>(
      `${historyAPI.basePath}/pins/?history_uuid=${data.answer_id}`,
      data,
      requestConfig,
    ),
  getDetails: (data: HistoryAPIRequest["getDetails"]) =>
    axiosClientV1.get<HistoryAPIResponse["answers"]>(
      `${historyAPI.basePath}/history_detail/?history_uuid=${data.uuid}&app_type=${data.appName}`,
    ),
};

export default historyAPI;
