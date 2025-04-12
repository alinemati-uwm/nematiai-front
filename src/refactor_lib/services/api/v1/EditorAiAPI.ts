import { createFetchEventSourceClientV1 } from ".";
import { type EditorAiAPIRequest } from "../../../types/api/v1/EditorAiAPI";

const EditorAPI = {
  generateAIWriter:
    createFetchEventSourceClientV1<EditorAiAPIRequest["generateEditorAI"]>(
      "/general/editor/",
    ),
};

export default EditorAPI;
