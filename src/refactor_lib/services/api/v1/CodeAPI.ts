import { type CodeAPIRequest } from "@/refactor_lib/types/api/v1/CodeAPI";

import { createFetchEventSourceClientV1 } from ".";

const codeAPI = {
  basePath: "/codes",
  generate: createFetchEventSourceClientV1<CodeAPIRequest["generateCode"]>(
    "/codes/generate_code/",
  ),
  // generate: (params: CodeAPIRequest["generateCode"]) =>
  // 	axiosClientV1.post(codeAPI.basePath + "/generate_code/", params),
};

export default codeAPI;
