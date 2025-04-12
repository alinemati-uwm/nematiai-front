import { type aiImagePageTypes } from "@/components/pages/image/feature/types";
import {
  checkImageSizesEqual,
  checkImageTransparency,
} from "@/components/pages/image/feature/utils";
import { type ModelItem } from "@/services/types";

import imageTabsModel, { type formDataTabs } from "../model";

type promptFormat = {
  getModel: ModelItem;
  document_name: string;
  workspace_id: number;
  values: aiImagePageTypes["states"]["image_to_image"];
};

type checkImage = {
  image: File;
  mask: File;
};

const imageToImageFormModel = (() => {
  // Function to check if the provided images and masks are transparent or have equal sizes
  const checkImage = async ({ image, mask }: checkImage) => {
    // Check transparency of the image and mask if provided
    if (image) await checkImageTransparency(image);
    if (mask) await checkImageTransparency(mask);

    // If both image and mask are provided, check if their sizes are equal
    if (mask && image) {
      const checkSizes = await checkImageSizesEqual(image, mask);
      // If the sizes are not equal, throw an error
      if (!checkSizes)
        throw Error(
          "The images have different dimensions. Please ensure both images are the same size",
        );
    }
  };

  // Function to generate the data based on the form values
  const generateData = ({
    getModel,
    document_name,
    values,
    workspace_id,
  }: promptFormat) => {
    const url = getModel.url.url; // Get the model URL

    // Filter out 'mask' and 'mask_image' from options
    const options = Object.fromEntries(
      Object.entries(values.options).filter(
        ([key]) => !["mask", "mask_image"].includes(key),
      ),
    );

    // If the URL matches the condition for image-to-image generation with prompt
    if (url.search("stability_generate_image_to_image_with_prompt") >= 0) {
      return {
        ...options,
        image_strength: 0.35, // Set the image strength
        steps: 30, // Number of steps
        sampler: "DDIM", // Sampler type
        samples: 1, // Number of samples
        model: getModel.model, // Model to be used
        style_preset: "3d-model", // Style preset for the generated image
        cfg_scale: 7, // CFG scale value
        document_name, // Document name
        workspace_id, // Workspace ID
        seed: 0, // Random seed
        init_image_mode: "IMAGE_STRENGTH", // Initial image mode
        clip_guidance_preset: "FAST_BLUE", // Clip guidance preset
        text_prompts: [
          {
            text: values.prompt, // Prompt text
            weight: 0.5, // Weight for the prompt
          },
        ],
      };
    }
    // If the URL matches the condition for image-to-image generation with mask
    else if (url.search("stability_generate_image_to_image_with_mask") >= 0) {
      return {
        ...options,
        steps: 30,
        sampler: "DDIM",
        samples: 1,
        model: getModel.model,
        style_preset: "3d-model",
        mask_source: "MASK_IMAGE_WHITE", // Source for the mask
        cfg_scale: 7,
        document_name,
        workspace_id,
        seed: 0,
        clip_guidance_preset: "FAST_BLUE",
        text_prompts: [
          {
            text: values.prompt,
            weight: 0.5,
          },
        ],
      };
    } else {
      // Default data generation for image-to-image operation
      return {
        ...options,
        model: getModel.model,
        n: values.options.n
          ? typeof values.options.n === "number"
            ? values.options.n
            : parseInt(values.options.n) // Handle the number of samples (n)
          : 1,
        response_format: values.response_format ?? "url", // Response format (URL by default)
        size: values.options.size ?? "1024x1024", // Image size (default 1024x1024)
        document_name,
        workspace_id,
        prompt: values.prompt, // Prompt text
      };
    }
  };

  // Function to process the form data for image-to-image operations
  const form = async ({
    getModel,
    values,
    document_name,
    workspace_id,
  }: formDataTabs) => {
    // Extract the mask from the options if present
    const mask = values.options.mask ?? values.options.mask_image;

    // Check if image or mask is provided, then validate them
    if (mask || values.image) await checkImage({ image: values.image, mask });

    // Generate the necessary data based on the form values
    const generate_data = generateData({
      values,
      getModel,
      document_name,
      workspace_id,
    });

    // Return the form data including image and mask (if present) along with the generated data
    return {
      image: values.image,
      ...((imageTabsModel.checkKey(values?.options, "mask") ||
        imageTabsModel.checkKey(values?.options, "mask_image")) && {
        mask,
      }),
      generate_data: JSON.stringify(generate_data), // Return the generated data as a JSON string
    };
  };

  // Return the form function to be used in the model
  return { form };
})();

export default imageToImageFormModel;
