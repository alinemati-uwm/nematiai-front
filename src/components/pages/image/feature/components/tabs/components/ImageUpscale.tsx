import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import useAttachments from "@/components/ui/attachments/Attachments";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import { imageApi } from "@/services/ai-image";

import useImagePage from "../../../hooks/useImagePage";
import useRouteAiImage from "../../../hooks/useRouteAiImage";
import FormAiSubmit from "../../FormAiSubmit";
import sendGalleryModel from "../../gallery/components/icons/buttons/send/model";
import HandleOptions from "../../HandleOptions";
import useSubmitTabs from "../useSubmitTabs";
import ImageErrorTabs from "./components/Error";
import ImageLoadingTabs from "./components/Loading";
import { type imageToImageProps } from "./ImageToImage";

function ImageUpscale({
  onSubmit,
  defaultValues,
  quantity,
  sendImage,
  document_name,
}: imageToImageProps) {
  // Fetching the model data for 'image_upscale' using react-query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.aiImage.image_upscale,
    queryFn: () => imageApi.getImageModels("image_upscale"), // Fetch models for image upscaling
    select: data => data.data, // Extract the necessary data from the API response
    retry: 3, // Retry up to 3 times if the request fails
    retryDelay: 3000, // Retry with a delay of 3 seconds
  });

  // Initialize model, form, and update functionality for the page
  const { getModel, updateModel, form, initialModel } = useImagePage({
    data,
    defaultValues,
  });
  const { setValue, watch } = form;
  const { submit, loading } = useSubmitTabs();
  const { to } = useRouteAiImage();

  // Initialize model with fetched data when it changes
  useEffect(() => {
    initialModel();
  }, [data]);

  // Set up file attachments (only .png files, max size 5MB, max upload 1)
  const { holderDropFile, content, addFile } = useAttachments({
    accept: [".png"],
    maxSize: 5,
    maxUpload: 1,
    initialValues: watch().image ? [watch().image] : [], // Initialize with existing image if available
    onChange: async images => {
      const files = Object.values(images);
      setValue("image", files.length ? files[files.length - 1] : ({} as File)); // Set the selected file in the form
    },
  });

  // When 'to' (destination URL) changes, convert it to a file and add it to the form
  useEffect(() => {
    if (to && addFile) {
      sendGalleryModel.urlToFile(to).then(file => addFile({ files: [file] }));
    }
  }, [to]);
  console.log(watch().image);

  // Render loading or error states, or the main content based on data fetching status
  return isLoading ? (
    <ImageLoadingTabs /> // Show loading state if data is still being fetched
  ) : isError ? (
    <ImageErrorTabs refetch={refetch} /> // Show error state if the request fails
  ) : (
    <div className="flex flex-col gap-form">
      {/* Display file attachment drop area and content */}
      {holderDropFile}
      {content}

      {/* If the model has parameters, display the options form */}
      {getModel?.params && Object.keys(getModel.params).length ? (
        <HandleOptions
          fields={getModel.params} // Render options based on the model's parameters
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
              tab: "image_upscale", // Specify the tab being used
              document_name, // Pass the document name for submission
            })
          }
          updateModel={updateModel} // Handle model updates if needed
          inputLenght={!(watch().image instanceof File) ? 0 : 1}
        />
      ) : null}
    </div>
  );
}

export default ImageUpscale;
