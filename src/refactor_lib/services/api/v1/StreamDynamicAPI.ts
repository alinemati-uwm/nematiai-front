import { type StreamDynamicTypeAPI } from "@/refactor_lib/types/api/v1/StreamDynamicAPI";

import { createFetchEventSourceClientV1 } from ".";

const StreamDynamicAPI = {
  generate: createFetchEventSourceClientV1<StreamDynamicTypeAPI>,
};

export default StreamDynamicAPI;
