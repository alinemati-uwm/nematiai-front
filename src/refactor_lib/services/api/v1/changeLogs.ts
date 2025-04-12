import { getApiBaseUrl } from "@/refactor_lib/services/api/v1/index";

const baseUrl = getApiBaseUrl();

const changeLogsApi = {
  basePath: "/changelogs",
  about: async () => {
    const response = await fetch(`${baseUrl}${changeLogsApi.basePath}/about/`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as Promise<{
      about: string;
      policy: string;
      terms: string;
      title: string;
    }>;
  },
};

export default changeLogsApi;
