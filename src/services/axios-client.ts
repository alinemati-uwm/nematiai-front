import axios from "axios";

import { isBrowser } from "@/lib/utils";
import { getApiBaseUrl } from "@/refactor_lib/services/api/v1";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

// import { getSession } from "next-auth/react";

/**
 * `axiosClient` is an instance of `axios` with a custom configuration.
 * It uses the `create` method from `axios` to create the instance,
 * and the `use` method from `axios` to add an interceptor to the request pipeline.
 *
 * The `axiosClient` has the following configuration:
 * - `baseURL`: The base URL for the API, which is taken from the environment variable `NEXT_PUBLIC_API_URL`.
 * - `headers`: The headers for the requests, which include the `Content-Type` header set to `application/json`.
 *
 * The `axiosClient` has a request interceptor that adds the `Authorization` header to the requests if there is a current session.
 * The `Authorization` header is set to `Bearer ${session.user.accessToken}`, where `session.user.accessToken` is the access token from the current session.
 * The interceptor uses the `getSession` function from `next-auth/react` to get the current session.
 *
 * If there is an error during the execution of the interceptor, it returns a rejected promise with the error.
 *
 * @returns AxiosInstance The `axiosClient` instance.
 */
const axiosClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// check if auth header doesn't exist set it
axiosClient.interceptors.request.use(
  async config => {
    if (isBrowser()) {
      const session = LocalStorageManger.getUserSession();
      if (session) {
        config.headers["Authorization"] = `Bearer ${session.access_token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

export default axiosClient;
