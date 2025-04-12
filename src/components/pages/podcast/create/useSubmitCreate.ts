import { useContext } from "react";

import PodcastCreateContext from "@/components/pages/podcast/create/context";
import useToaster from "@/refactor_lib/hooks/shared/useToaster";

export const useSubmitCreate = () => {
  // Access methods and states from podcast creation context
  const {
    methods: { updateState },
    states: {
      params: { file, language, prompt, voice }, // Required parameters for podcast creation
      tab, // Current tab state (e.g., "text" or "file")
    },
  } = useContext(PodcastCreateContext);

  // Access toaster for displaying error messages
  const { toaster } = useToaster();

  // Function to handle podcast creation submission
  const submit = async () => {
    try {
      // Validation checks based on the current tab
      if (tab === "long_text" && !prompt) throw Error("Enter the prompt");
      if (tab === "long_text" && prompt.length < 150)
        throw Error("Prompt at least 150 character");
      if (tab === "pdf_doc" && !file) throw Error("Enter the file");
      if (voice.length !== 2) throw Error("Enter two voices");
      if (!language) throw Error("Enter the language");

      // Update state to indicate processing
      updateState("processing", true);
    } catch (error: any) {
      // Handle errors and display toaster message
      const message = error?.response?.data?.detail ?? error;
      toaster({
        toastProps: {
          type: "error",
          message:
            typeof message === "string" ? message : (error as Error).message,
        },
      });
    }
  };

  return { submit };
};
