import { type textToImageServiceTypes } from "@/services/types/aiImagesTypes";

import { type imageTypes } from "./types";

export type featureMappingTypes = Record<string, imageTypes>;

const aiImageModel = (() => {
  // Function to preload image URLs from the response data
  const preloadImages = async (data: textToImageServiceTypes["response"]) => {
    // Extract image URLs from the response data and return them
    const imageUrls = Object.values(data);
    return Object.values(imageUrls); // Return the values (array of image URLs)
  };

  // Mapping of feature names to internal model states
  const featureMapping: featureMappingTypes = {
    "text-to-image": "text_to_image",
    "image-to-image": "image_to_image",
    "image-upscale": "image_upscale",
  };

  // Return the object containing methods for use
  return {
    preloadImages,
    featureMapping,
  };
})();

export default aiImageModel; // Export the aiImageModel object for use elsewhere
