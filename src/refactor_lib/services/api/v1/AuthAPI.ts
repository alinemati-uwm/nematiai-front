import { type AxiosRequestConfig } from "axios";

import {
  type AuthAPIRequest,
  type AuthAPIResponse,
} from "@/refactor_lib/types/api/v1/AuthAPI";

import { axiosClientV1 } from ".";

const authAPI = {
  basePath: "/auth",
  register: (
    data: AuthAPIRequest["register"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<AuthAPIResponse["register"]>(
      `${authAPI.basePath}/register/`,
      data,
      requestConfig,
    ),
  sendItAigain: (email: AuthAPIRequest["sendItAgain"]) =>
    axiosClientV1.post<AuthAPIRequest["sendItAgain"]>(
      `${authAPI.basePath}/requestConfirmationEmail/`,
      {
        email: email,
      },
    ),
  registerConfirm: (
    data: AuthAPIRequest["registerConfirm"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<AuthAPIResponse["registerConfirm"]>(
      `${authAPI.basePath}/register/confirm/`,
      data,
      requestConfig,
    ),
  login: (data: AuthAPIRequest["login"], requestConfig?: AxiosRequestConfig) =>
    axiosClientV1.post<AuthAPIResponse["login"]>(
      `${authAPI.basePath}/login/`,
      data,
      requestConfig,
    ),
  logout: () => axiosClientV1.post(`${authAPI.basePath}/logout/`),
  refresh: (
    data: AuthAPIRequest["refresh"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<AuthAPIResponse["refresh"]>(
      `${authAPI.basePath}/refresh/`,
      data,
      requestConfig,
    ),
  forgetPassword: (
    data: AuthAPIRequest["forgetPassword"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<AuthAPIResponse["forgetPassword"]>(
      `${authAPI.basePath}/forget-password/`,
      data,
      requestConfig,
    ),
  validateForgetPasswordToken: (
    data: AuthAPIRequest["validateForgetPasswordToken"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<AuthAPIResponse["validateForgetPasswordToken"]>(
      `${authAPI.basePath}/validate-forget-password-token/`,
      data,
      requestConfig,
    ),
  setNewPassword: (
    data: AuthAPIRequest["setNewPassword"],
    requestConfig?: AxiosRequestConfig,
  ) =>
    axiosClientV1.post<AuthAPIResponse["setNewPassword"]>(
      `${authAPI.basePath}/set-new-password/`,
      data,
      requestConfig,
    ),
  oauthGoogle: (requestConfig?: AxiosRequestConfig) =>
    axiosClientV1.post<AuthAPIResponse["oauthGoogle"]>(
      `${authAPI.basePath}/oauth/google/`,
      {},
      requestConfig,
    ),
};

export default authAPI;
