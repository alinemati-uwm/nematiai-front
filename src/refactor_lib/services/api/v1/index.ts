import { fetchEventSource } from "@microsoft/fetch-event-source";
import axios, { type AxiosRequestConfig } from "axios";

import { APP_ROUTES } from "@/refactor_lib/constants";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

import authAPI from "./AuthAPI";

export interface StreamGeneratorProps<RequestBodyType> {
  body: RequestBodyType;
  headers?: Record<string, string>;
  onMessageDataHandler?: (json: any) => void;
  abortController?: AbortController;
  queryParams?: Record<string, string>;
  onClose?: () => void;
}

export const getApiBaseUrl = () => {
  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
      return `https://${process.env.NEXT_PUBLIC_API_SUBDOMAIN}.nerdstudio.ai${process.env.NEXT_PUBLIC_API_URL}`;
    } else {
      // Development environment
      return process.env.NEXT_PUBLIC_API_URL;
    }
  }

  if (process.env.NODE_ENV === "production") {
    const locationName = window.location.hostname
      .split(".")
      .slice(-2)
      .join(".");

    return `${window.location.protocol}//${process.env.NEXT_PUBLIC_API_SUBDOMAIN}.${locationName}${process.env.NEXT_PUBLIC_API_URL}`;
  } else {
    // Development environment
    return process.env.NEXT_PUBLIC_API_URL;
  }
};

export function createFetchEventSourceClientV1<RequestBodyType>(
  endpoint: string,
) {
  return async ({
    body,
    headers,
    onMessageDataHandler,
    onClose,
    abortController,
    queryParams,
  }: StreamGeneratorProps<RequestBodyType>) => {
    let queryString = "";

    if (queryParams) {
      const params = new URLSearchParams(queryParams);
      queryString = `?${params.toString()}`;
    }

    const userSession = LocalStorageManger.getUserSession();

    if (!userSession?.access_token) window.location.assign(APP_ROUTES.login);

    await fetchEventSource(`${getApiBaseUrl()}${endpoint}${queryString}`, {
      method: "POST",
      openWhenHidden: true,
      headers: {
        ...headers,
        Authorization: `Bearer ${userSession?.access_token}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify(body),
      signal: abortController?.signal,
      async onopen(res) {
        if (!res.ok) {
          const error = await res.json();

          throw new Error(error.detail || "Unexpected error on our side!");
        }
      },
      onmessage(event) {
        const { data } = event;
        if (data && onMessageDataHandler) {
          const parsedData = JSON.parse(data);

          onMessageDataHandler(parsedData);
        }
      },
      onclose() {
        if (onClose) onClose();
      },
      onerror(err) {
        throw err;
      },
    });
  };
}

export const axiosClientV1 = axios.create({ baseURL: `${getApiBaseUrl()}` });
axiosClientV1.interceptors.request.use(
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

axiosClientV1.interceptors.response.use(
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
              axiosClientV1
                .request(config)
                .then(response => resolve(response))
                .catch(err => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            // Retry the original request
            return axiosClientV1(originalRequest);
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

export { default as authAPI } from "./AuthAPI";
