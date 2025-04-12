import { useContext, useEffect, type ReactNode } from "react";

import useGetDetailsHistory from "@/refactor_lib/hooks/queries/useGetDetailsHistory";

import AiImagePageContext from "../context";
import useRouteAiImage from "../hooks/useRouteAiImage";
import { type imageTypes } from "../types";

type props = {
  children: ReactNode;
};

function UpdateHistoryAiImage({ children }: props) {
  // Extract feature and history from the custom hook useRouteAiImage
  const { feature, history } = useRouteAiImage();
  // Fetch history details using the hook useGetDetailsHistory based on the current feature and history UUID
  const { data } = useGetDetailsHistory({
    appName: feature,
    uuid: history ?? "", // Only fetch if history exists
    enabled: history !== null, // Fetch data only if history is not null
  });

  // Extract dispatch method from aiImagePageContext for managing global state
  const {
    methods: { dispatch },
  } = useContext(AiImagePageContext);

  // Effect to handle the fetched data and update the global state when history and data are available
  useEffect(() => {
    // If history exists and URLs are present in the fetched data, dispatch actions to update state
    if (history && data?.urls.length) {
      // Reset previous states before updating new ones
      dispatch({ type: "reset_states" });

      // Dispatch prompt and other properties to the global state
      dispatch({
        type: "set_state",
        payload: {
          state: feature, // The state corresponding to the current feature
          value: {
            prompt: data.prompt, // Set prompt from the fetched data
          },
        },
      });

      // Set document name (title) in the global state
      dispatch({
        type: "set_state",
        payload: {
          state: "document_name", // Document name state
          value: data.title ?? "", // Set the title or empty string if not available
        },
      });

      // Set the result (URLs and app type) in the global state for rendering
      dispatch({
        type: "set_result",
        payload: {
          state: data.app_type as imageTypes, // Set app type (e.g., image type)
          value: data.urls, // Set the URLs fetched from the data
        },
      });
    }
  }, [history, data]); // Dependencies: Run the effect when either history or data changes

  // Return children components (children are passed as-is, no rendering logic is added here)
  return children;
}

export default UpdateHistoryAiImage;
