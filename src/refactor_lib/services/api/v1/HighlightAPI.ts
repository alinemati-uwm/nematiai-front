import { type highlightAPIRequest } from "@/refactor_lib/types/api/v1/HighlightAPI";

import { createFetchEventSourceClientV1 } from ".";

const highlightAPI = {
  basePath: "/highlights",
  generateHighlight: createFetchEventSourceClientV1<highlightAPIRequest>(
    "/highlights/generate_highlight/",
  ),
};

export default highlightAPI;
