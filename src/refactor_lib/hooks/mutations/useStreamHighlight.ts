import highlightAPI from "@/refactor_lib/services/api/v1/HighlightAPI";

import useStreamMutation from "./useStreamMutation";

const useStreamHighlight = () => {
  return useStreamMutation({
    appType: "highlight",
    mutationFn: highlightAPI.generateHighlight,
  });
};

export default useStreamHighlight;
