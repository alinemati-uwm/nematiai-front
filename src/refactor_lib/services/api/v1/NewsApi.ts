import { type NewsTopic } from "@/refactor_lib/types/api/v1/NewsApiTypes";

import { axiosClientV1 } from ".";

const newsApi = {
  basePath: "/news",
  getAllTopic: (topic: string) => {
    axiosClientV1.get<NewsTopic["getTopic"]>(
      `${newsApi.basePath}/by-topic/${topic}/?page=${1}`,
    );
  },
};
export default newsApi;
