import { type ModelItem } from "@/services/types";
import { type imageToImageServiceTypes } from "@/services/types/aiImagesTypes";

import { type aiImageReducerActionTypes } from "./reducer";

type modelTypes = {
  models: ModelItem[];
  options: Record<string, any>;
};

export enum imageFeatures {
  "text_to_image" = "text_to_image",
  "image_to_image" = "image_to_image",
  "image_upscale" = "image_upscale",
}
export type imageTypes = "text_to_image" | "image_to_image" | "image_upscale";

type image_to_image = Omit<
  imageToImageServiceTypes["params"]["generate_data"],
  "workspace_id" | "document_name"
> &
  Pick<imageToImageServiceTypes["params"], "image"> &
  modelTypes;

export type aiImagePageTypes = {
  states: {
    text_to_image: image_to_image;
    image_to_image: image_to_image;
    image_upscale: image_to_image;
    result: Record<imageTypes, string[]>;
    loading: boolean;
    error: boolean;
    workspace_id: number;
    document_name: string;
    sendImage?: {
      tab: imageTypes;
      file: File;
    };
  };
  methods: {
    dispatch<T extends keyof aiImagePageTypes["states"]>(
      action: aiImageReducerActionTypes<T>,
    ): void;
  };
};
