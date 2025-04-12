import { useMemo } from "react";

import { useForm } from "react-hook-form";

import { type ModelItem } from "@/services/types";

import { type aiImagePageTypes } from "../types";

interface props {
  data: ModelItem[] | undefined;
  defaultValues: any;
}

function useImagePage({ data, defaultValues }: props) {
  // Initialize the form using useForm hook with type definition for 'image_to_image' state
  const form = useForm<aiImagePageTypes["states"]["image_to_image"]>({
    defaultValues: {
      image: defaultValues?.image, // Set the default image if provided
      prompt: defaultValues?.prompt ?? null, // Set the default prompt, or null if not provided
    },
  });

  // Destructure methods from the form for easier access
  const { setValue, watch } = form;

  // Watch for changes in the 'models' and 'model' values in the form
  const { models, model } = watch();

  // Memoize the result of finding the model that matches the current 'model' in the form
  // It will re-run only when 'models' or 'model' changes
  const getModel = useMemo(
    () => models && models.find(el => el.title === model),
    [models, model],
  );

  // Function to update the selected model and its associated options in the form
  const updateModel = (modelTitle: string) => {
    if (!data) return; // If no data is provided, do nothing
    setValue("model", modelTitle); // Update the selected model in the form
    const params = data.find(el => el.title === modelTitle)?.params;
    if (params) {
      // If the model has parameters, set the default options
      const options: Record<string, any> = {};
      Object.keys(params).forEach(el => {
        const item = params[el];
        options[el] = item.default; // Set the default value for each option
      });
      setValue("options", options); // Update the options in the form
    }
  };

  // Function to initialize the model by setting the first model from the data
  const initialModel = () => {
    if (!data) return; // If no data is provided, do nothing
    const model = data[0]; // Get the first model from the data
    setValue("models", data); // Set the list of models in the form
    if (model.title) {
      setValue("model", model.title); // Set the default selected model
      updateModel(model.title); // Update the model and options
    }
  };

  // Return necessary values and functions from the hook
  return { getModel, updateModel, form, initialModel };
}

export default useImagePage;
