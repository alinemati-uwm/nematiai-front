import {
  type ModelAPIRequest,
  type ModelAPIResponse,
} from "@/refactor_lib/types/api/v1/ModelAPI";

import { axiosClientV1 } from ".";

const modelAPI = {
  basePath: "/models",
  getAllModels: ({ modelName }: ModelAPIRequest) =>
    axiosClientV1.get<ModelAPIResponse["getAllModels"]>(
      `${modelAPI.basePath}/list_of_models`,
      {
        params: {
          ...(modelName && { app_type: modelName }),
        },
      },
    ),
};

export default modelAPI;
