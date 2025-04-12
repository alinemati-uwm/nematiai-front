import { type AxiosRequestConfig } from "axios";

import type { ModelItem } from "@/services/types";

import axiosClient from "./axios-client";
import {
  type imageToImageServiceTypes,
  type imageUpscaleServiceTypes,
  type textToImageServiceTypes,
} from "./types/aiImagesTypes";

export const imageApi = {
  getImageModels: (modelType: string, header?: AxiosRequestConfig) => {
    return axiosClient.post<ModelItem[]>(
      "/engines/?app_type=" + modelType,
      {},
      header,
    );
  },
  getImageToImageModel: () => {
    return axiosClient.get<ModelItem[]>("/engines/image_to_image/");
  },
  generateTextToImage: (props: textToImageServiceTypes["params"]) => {
    return axiosClient.post<textToImageServiceTypes["response"]>(
      "/images/open_ai_generate_text_to_image/",
      props,
    );
  },
  generateImageUpscale: (props: imageUpscaleServiceTypes["params"]) => {
    return axiosClient.post<imageUpscaleServiceTypes["response"]>(
      "/images/stability_generate_image_upscale/",
      props,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },
  generateImageToImage: (props: imageToImageServiceTypes["params"]) => {
    return axiosClient.post<imageToImageServiceTypes["response"]>(
      "/images/open_ai_generate_image_to_image/",
      props,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },
};
