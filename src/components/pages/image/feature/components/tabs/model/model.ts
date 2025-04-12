import * as Yup from "yup";

import { type ModelItem } from "@/services/types";

import { type aiImagePageTypes } from "../../../types";
import imageToImageFormModel from "./modules/image";
import textToImageFormModel from "./modules/text";
import upscaleToImageFormModel from "./modules/upscale";

export type validateSchemaImageTabs = {
  imageDictionary: any;
  form: Record<"document_name" | "workspace_id", any> &
    Partial<Record<"prompt" | "image" | "generate_data", any>>;
};

export type formDataTabs = {
  getModel: ModelItem;
  values: aiImagePageTypes["states"]["image_to_image"];
  quantity?: number;
  workspace_id: number;
  document_name: string;
};

const imageTabsModel = (() => {
  // Function to check if a specific key exists in the form object
  const checkKey = (form: any, find: string) =>
    Object.keys(form).includes(find);

  // Validation function for image processing forms
  const validate = async ({
    form, // The form data to validate
    imageDictionary, // The dictionary containing error messages
  }: validateSchemaImageTabs) => {
    // If the form contains 'generate_data', merge it with the current form
    if (form?.generate_data)
      form = { ...form, ...JSON.parse(form?.generate_data) };

    // Define the validation schema using Yup
    const paramsSchema = Yup.object().shape({
      // Validate 'prompt' if it exists in the form
      ...(checkKey(form, "prompt") && {
        prompt: Yup.string()
          .max(1000) // Maximum length of 1000 characters
          .required(imageDictionary.empty_prompt_error), // Custom error message
      }),
      // Validate 'image' if it exists in the form
      ...(checkKey(form, "image") && {
        image: Yup.mixed().required(imageDictionary.empty_image_error), // Image field required
      }),
      // Validate 'mask' if it exists in the form
      ...(checkKey(form, "mask") && {
        mask: Yup.mixed().required(imageDictionary.mask_image_error), // Mask field required
      }),
      // Validate 'mask_image' if it exists in the form
      ...(checkKey(form, "mask_image") && {
        mask_image: Yup.mixed().required(imageDictionary.mask_image_error), // Mask image field required
      }),
      // Validate 'text_prompts' if it exists in the form
      ...(checkKey(form, "text_prompts") && {
        text_prompts: Yup.array().of(
          Yup.object().shape({
            text: Yup.string().required(imageDictionary.empty_prompt_error), // Each text prompt is required
          }),
        ),
      }),
      // 'document_name' field is required in all cases
      document_name: Yup.string().required(
        imageDictionary.empty_document_name_error,
      ),
      // 'workspace_id' field is required in all cases
      workspace_id: Yup.string().required(
        imageDictionary.empty_workspace_id_error,
      ),
    });

    // Validate the form based on the schema and return the result
    return await paramsSchema.validate(form, { abortEarly: true });
  };

  // Function to handle form data for different image-related operations
  const formData = {
    // Handle form data for text-to-image operation
    text_to_image: async ({
      getModel, // Model function for text-to-image
      values, // Form values
      quantity, // Quantity of generated images
      document_name, // Document name
      workspace_id, // Workspace ID
    }: formDataTabs) =>
      textToImageFormModel.form({
        values,
        getModel,
        quantity,
        document_name,
        workspace_id,
      }),

    // Handle form data for image-upscale operation
    image_upscale: async ({
      getModel, // Model function for image-upscale
      values, // Form values
      quantity, // Quantity of upscale images
      document_name, // Document name
      workspace_id, // Workspace ID
    }: formDataTabs) =>
      upscaleToImageFormModel.form({
        values,
        getModel,
        quantity,
        document_name,
        workspace_id,
      }),

    // Handle form data for image-to-image operation
    image_to_image: async ({
      getModel, // Model function for image-to-image
      values, // Form values
      quantity, // Quantity of image-to-image transformations
      document_name, // Document name
      workspace_id, // Workspace ID
    }: formDataTabs) =>
      imageToImageFormModel.form({
        values,
        getModel,
        quantity,
        document_name,
        workspace_id,
      }),
  };

  // Return the object containing validation function, form data handlers, and key checking
  return { validate, formData, checkKey };
})();

export default imageTabsModel;
