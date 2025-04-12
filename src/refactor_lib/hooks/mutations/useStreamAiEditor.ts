import EditorAPI from "@/refactor_lib/services/api/v1/EditorAiAPI";

import useStreamMutation from "./useStreamMutation";

const useStreamAiEditor = () => {
  return useStreamMutation({
    appType: "template",
    mutationFn: EditorAPI.generateAIWriter,
  });
};

export default useStreamAiEditor;
