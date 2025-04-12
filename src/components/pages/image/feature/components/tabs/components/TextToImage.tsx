import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import useImageEditorPage from "@/components/pages/imageditor/useImageEditorPage";
import { useGetDictionary } from "@/hooks";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import { imageApi } from "@/services/ai-image";

import useImagePage from "../../../hooks/useImagePage";
import { type aiImagePageTypes } from "../../../types";
import FormAiSubmit from "../../FormAiSubmit";
import HandleOptions from "../../HandleOptions";
import PromptTextArea from "../../PromptTextArea";
import useSubmitTabs from "../useSubmitTabs";
import ImageErrorTabs from "./components/Error";
import ImageLoadingTabs from "./components/Loading";

export interface textToImageProps {
  defaultValues?: aiImagePageTypes["states"]["image_to_image"];
  onSubmit(urls: string[], data: any): void;
  quantity?: number;
  document_name: string;
}

function TextToImage({
  defaultValues,
  onSubmit,
  quantity,
  document_name,
}: textToImageProps) {
  // Fetching the model data for 'text_to_image' using react-query
  const { auth } = useImageEditorPage(); // Get the authentication token if available
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.aiImage.text_to_image, // Query key for 'text_to_image' model data
    queryFn: () =>
      imageApi.getImageModels(
        "text_to_image", // Fetch the 'text_to_image' model
        auth ? { headers: { Authorization: `Bearer ${auth}` } } : undefined, // Include authorization header if auth exists
      ),
    select: data => data.data, // Select only the necessary data from the API response
    retry: 3, // Retry the request up to 3 times if it fails
    retryDelay: 3000, // Retry delay of 3 seconds
  });

  // Initialize model and form state using the fetched data
  const { getModel, updateModel, form, initialModel } = useImagePage({
    data: data,
    defaultValues,
  });

  const { setValue, watch } = form; // Destructure form methods
  const { submit, loading } = useSubmitTabs(); // Handle form submission and loading state

  // Access dictionary for translations
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  // Initialize the model when the data changes
  useEffect(() => {
    initialModel();
  }, [data]);

  // Render loading or error states, or the main content based on data fetching status
  return isLoading ? (
    <ImageLoadingTabs /> // Show loading state if data is still being fetched
  ) : isError ? (
    <ImageErrorTabs refetch={refetch} /> // Show error state if the request fails
  ) : (
    <div className="flex flex-col gap-form">
      {/* Render the text area for entering the prompt */}
      <PromptTextArea
        setValue={value => setValue("prompt", value)} // Set the prompt value in the form
        placeholder={imageDictionary.enter_prompt_ai_image_set} // Placeholder text for the prompt input
        value={watch().prompt} // Watch the prompt value from the form
      />

      {/* If the model has parameters, render the options form */}
      {getModel?.params && Object.keys(getModel.params).length ? (
        <HandleOptions
          fields={getModel.params} // Render options based on the model's parameters
          quantity={quantity} // Pass quantity if necessary for the model
          values={watch().options} // Get current values for the options
          setValue={
            (type: string, value: any) =>
              setValue("options", { ...watch().options, [type]: value }) // Update form values for options
          }
        />
      ) : null}

      {/* If the model is available, render the form for submission */}
      {getModel?.model ? (
        <FormAiSubmit
          loading={loading} // Show loading spinner if submitting
          form={watch()} // Pass the form data
          submit={() =>
            submit({
              getModel, // Pass the model data
              onSubmit, // Handle form submission
              defaultValues: watch(), // Use the current form values as default
              tab: "text_to_image", // Specify the tab being used
              document_name, // Pass the document name for submission
            })
          }
          updateModel={updateModel} // Handle model updates if needed
          inputLenght={watch().prompt.length}
        />
      ) : null}
    </div>
  );
}

export default TextToImage;
