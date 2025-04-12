import { type AxiosRequestConfig } from "axios";

import {
  type UserAPIRequest,
  type UserAPIResponse,
} from "@/refactor_lib/types/api/v1/UserAPI";

import { axiosClientV1 } from ".";

const userAPI = {
  basePath: "/users",
  getMe: () =>
    axiosClientV1.get<UserAPIResponse["getMe"]>(`${userAPI.basePath}/me/`),
  updateMe: (
    data: UserAPIRequest["updateMe"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.patch<UserAPIResponse["updateMe"]>(
      `${userAPI.basePath}/me/`,
      data,
      requestConfig,
    ),
  changePassword: (
    data: UserAPIRequest["changePassword"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<UserAPIResponse["changePassword"]>(
      `${userAPI.basePath}/change/password/`,
      data,
      requestConfig,
    ),
  changeProfileImage: (
    data: UserAPIRequest["changeProfileImage"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.postForm<UserAPIResponse["changeProfileImage"]>(
      `${userAPI.basePath}/change/profile_image/`,
      data,
      requestConfig,
    ),
  changeEmailToken: (
    data: UserAPIRequest["changeEmailToken"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<UserAPIResponse["changeEmailToken"]>(
      `${userAPI.basePath}/change/email/token/`,
      data,
      requestConfig,
    ),
  changeEmailConfirm: (
    data: UserAPIRequest["changeEmailConfirm"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<UserAPIResponse["changeEmailConfirm"]>(
      `${userAPI.basePath}/change/email/confirm/`,
      data,
      requestConfig,
    ),
  deactivateAccount: (requestConfig?: AxiosRequestConfig) =>
    axiosClientV1.get<UserAPIResponse["deactivateAccount"]>(
      `${userAPI.basePath}/deactivate/`,
      requestConfig,
    ),
  invite: (params: UserAPIRequest["invite"]) =>
    axiosClientV1.post(`${userAPI.basePath}/invite/`, params),
};

export default userAPI;
