import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import useAttachments from "@/components/ui/attachments/Attachments";
import { useGetDictionary } from "@/hooks";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import { imageApi } from "@/services/ai-image";

import useImagePage from "../../../hooks/useImagePage";
import useRouteAiImage from "../../../hooks/useRouteAiImage";
import { type aiImagePageTypes } from "../../../types";
import FormAiSubmit from "../../FormAiSubmit";
import sendGalleryModel from "../../gallery/components/icons/buttons/send/model";
import HandleOptions from "../../HandleOptions";
import PromptTextArea from "../../PromptTextArea";
import useSubmitTabs from "../useSubmitTabs";
import ImageErrorTabs from "./components/Error";
import ImageLoadingTabs from "./components/Loading";

export interface imageToImageProps {
  defaultValues?: aiImagePageTypes["states"]["image_to_image"];
  onSubmit(urls: string[], data?: any): void;
  quantity?: number;
  sendImage?: aiImagePageTypes["states"]["sendImage"];
  document_name: string;
}

// Component to handle image-to-image functionality with form submission and file uploads
function ImageToImage({
  onSubmit,
  defaultValues,
  quantity,
  sendImage,
  document_name,
}: imageToImageProps) {
  // Fetch model data using useQuery, retries on failure, with a delay between retries
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.aiImage.image_to_image,
    queryFn: () => imageApi.getImageToImageModel(),
    select: data => data.data,
    retry: 3, // Retry fetching model data up to 3 times
    retryDelay: 3000, // 3 seconds delay between retries
  });

  // Fetch and set up form-related hooks and methods from `useImagePage`
  const { getModel, updateModel, form, initialModel } = useImagePage({
    data: data,
    defaultValues,
  });
  const { setValue, watch } = form; // Methods for setting and watching form values
  const { submit, loading } = useSubmitTabs(); // Handle form submission logic
  const { to } = useRouteAiImage(); // Route for image processing

  // Initialize model when data is available (on initial load or update)
  useEffect(() => {
    initialModel();
  }, [data]);

  // Fetch error and success dictionary values for UI prompts
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  // Initialize file attachment methods with constraints like max file size and format
  const { holderDropFile, content, addFile } = useAttachments({
    accept: [".png"], // Allow only PNG files
    maxSize: 5, // Maximum file size of 5MB
    initialValues: watch().image ? [watch().image] : [], // Set initial image if available
    maxUpload: 1, // Only allow one file upload
    // Update the image field when a new file is uploaded
    onChange: async images => {
      const files = Object.values(images);
      setValue("image", files.length ? files[files.length - 1] : ({} as File));
    },
  });

  // Handle image URL conversion to file when available from `to` (route for image)
  useEffect(() => {
    if (to && addFile)
      sendGalleryModel.urlToFile(to).then(file => addFile({ files: [file] }));
  }, [to]);

  // Conditionally render loading, error, or form content
  return isLoading ? (
    <ImageLoadingTabs /> // Show loading component while data is being fetched
  ) : isError ? (
    <ImageErrorTabs refetch={refetch} /> // Show error component and allow refetching if error occurs
  ) : (
    <div className="flex flex-col gap-form">
      {/* Render file drop area for file uploads */}
      {holderDropFile}
      {/* Render additional content (upload status, etc.) */}
      {content}
      {/* Render prompt text area for image generation */}
      <PromptTextArea
        setValue={value => setValue("prompt", value)} // Update prompt value in the form
        value={watch().prompt} // Current value of the prompt
        placeholder={imageDictionary.create_image_text_prompt} // Placeholder text
        style={{ minHeight: "270px" }}
      />
      {/* Render options for the image generation model, if available */}
      {getModel?.params && Object.keys(getModel.params).length ? (
        <HandleOptions
          fields={getModel.params} // Available parameters for the model
          quantity={quantity} // Quantity of generated images
          values={watch().options} // Current options set in the form
          setValue={(type: string, value: any) =>
            setValue("options", { ...watch().options, [type]: value })
          } // Update options in form
        />
      ) : null}

      {/* Render the form submission button if the model is available */}
      {getModel?.model ? (
        <FormAiSubmit
          loading={loading} // Show loading state when submitting
          form={watch()} // Current form values
          submit={() =>
            // Trigger form submission using `submit` function with the required parameters
            submit({
              getModel,
              onSubmit,
              defaultValues: watch(),
              tab: "image_to_image", // Tab identifier
              document_name,
            })
          }
          updateModel={updateModel} // Function to update the model
          inputLenght={watch().prompt.length}
        />
      ) : null}
    </div>
  );
}

export default ImageToImage;
