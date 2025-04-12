import { useContext, useEffect, type ReactNode } from "react";

import { useGetDictionary } from "@/hooks";

import AiImagePageContext from "../context";
import useModelAiImage from "../hooks/providerModel/useModelAiImage";
import useRouteAiImage from "../hooks/useRouteAiImage";

type props = {
  children: ReactNode;
};
function ProviderModelAiImage({ children }: props) {
  // Extract necessary functions and states from the useModelAiImage hook
  const { get, fillFields, loading, error, reset, getState } =
    useModelAiImage();
  // Extract dispatch method from aiImagePageContext to manage global state
  const {
    states,
    methods: { dispatch },
  } = useContext(AiImagePageContext);
  // Extract current feature and history from useRouteAiImage to handle routing logic
  const { feature, history } = useRouteAiImage();

  // Extract localized strings (e.g., error messages) from useGetDictionary
  const {
    page: {
      image: { somthing_wrong, try_again },
    },
  } = useGetDictionary();

  // Fill Fields: Effect to initialize the state when the component mounts
  useEffect(() => {
    // Call `get` to fetch data and dispatch it to the global state
    get(dispatch);
  }, []);

  // Effect to manage the loading and error states globally
  useEffect(() => {
    // Dispatch the loading and error states to the global state
    dispatch({
      type: "set_state",
      payload: { state: "loading", value: loading },
    });
    dispatch({ type: "set_state", payload: { state: "error", value: error } });
  }, [loading, error]);

  // Effect to fill fields whenever a model or feature changes
  useEffect(() => {
    // Get the current state for the selected feature
    const state = getState[feature];
    // If models are available, fill in the necessary fields
    if (state.models) {
      fillFields({
        models: state.models,
        modelName: state.model,
        dispatch,
        state: feature,
      });
    }
  }, [
    // Depend on states for various model types and routing history
    states.text_to_image.model,
    states.image_to_image.model,
    states.image_upscale.model,
    feature,
    history,
  ]);

  // Try Again: Reset state and refetch data when an error occurs
  const tryAgain = async () => {
    // Reset state to clear any error or loading state
    await reset();
    // Refetch data using the `get` method and dispatch it again
    get(dispatch);
  };

  // Return UI based on the error state:
  // If there's an error, show an error message with a retry button
  return error ? (
    <div className="flex justify-center items-center py-7">
      <div className="flex flex-col gap-y-3 justify-center w-[95%] p-5 max-w-[600px] rounded-md items-center bg-white py-7">
        {/* Error message section */}
        <div className="text-large bg-blue-50 w-full text-center py-3 rounded-sm border text-blue-950 border-blue-200">
          {somthing_wrong}
        </div>
        {/* Retry button */}
        <button
          onClick={tryAgain}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          {try_again}
        </button>
      </div>
    </div>
  ) : (
    // If no error, render the children components
    children
  );
}

export default ProviderModelAiImage;
