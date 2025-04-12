import axios, { type AxiosRequestConfig } from "axios";

import { APP_ROUTES } from "@/refactor_lib/constants";
import { authAPI } from "@/refactor_lib/services/api/v1";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

export const axiosClientExplore = axios.create({
  baseURL: "https://explorer.nerdstudio.ai/api",
});
axiosClientExplore.interceptors.request.use(
  async config => {
    const userSession = LocalStorageManger.getUserSession();

    if (userSession) {
      config.headers.Authorization = `Bearer ${userSession?.access_token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

const refreshAccessToken = async () => {
  const userSession = LocalStorageManger.getUserSession();
  if (!userSession) throw new Error("session not found!");
  return (await authAPI.refresh({ refresh_token: userSession.refresh_token }))
    .data;
};

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

axiosClientExplore.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      // 401 on refresh endpoint
      if ((error.config as AxiosRequestConfig).url?.includes("/refresh/")) {
        localStorage.clear();
        window.location.assign(APP_ROUTES.login);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        // const { access_token, refresh_token } = await refreshAccessToken();

        // Refresh the access token
        refreshAccessToken()
          .then(res => {
            const { access_token, refresh_token } = res;
            LocalStorageManger.updateAuthTokens({
              access_token,
              refresh_token,
            });

            // Update the request headers with the new access token
            error.config.headers["Authorization"] = `Bearer ${access_token}`;

            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosClientExplore
                .request(config)
                .then(response => resolve(response))
                .catch(err => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            // Retry the original request
            return axiosClientExplore(originalRequest);
          })
          .catch(err => {
            localStorage.clear();
            window.location.assign(APP_ROUTES.login);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  },
);
