import React from "react";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import { type ModelItem } from "@/services/types";

import EngineSelect from "./EngineSelect";

type props = {
  form: {
    model: string;
    models: ModelItem[];
  };
  loading: boolean;
  submit(): void;
  updateModel(modelName: string): void;
  inputLenght?: number;
};

function FormAiSubmit({
  loading,
  form,
  submit,
  updateModel,
  inputLenght,
}: props) {
  // Get dictionary values for image-related labels
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <>
      {/* Check if there are models available in the form */}
      {form.models && form.models.length ? (
        <div className="w-full flex flex-col gap-label-space -mb-2">
          {/* Label for engine selection */}
          <Label>{imageDictionary.engines_label} :</Label>

          {/* Engine select dropdown */}
          <EngineSelect
            value={form.model} // Current selected model
            setValue={updateModel} // Function to update model
            engines={form.models.map(el => ({
              id: el.title ?? "", // Unique engine identifier
              image: el.icon ?? "", // Icon for the engine
              name: el.title ?? el.model, // Display name for the engine
            }))}
            triggerClassName="h-input" // Custom class for the input
          />
        </div>
      ) : null}

      {/* Submit button section */}
      <div className="button-sticky-sidebar pt-4 flex flex-col gap-form">
        <Button
          className="w-full" // Full width button
          isPending={loading} // Show pending state if loading
          disabled={inputLenght === 0}
          onClick={() => {
            submit(); // Trigger submit action
          }}
        >
          <AppIcon icon="fluent:image-sparkle-20-regular" width={16} />{" "}
          {/* Icon inside button */}
          {imageDictionary.generate_label} {/* Text for the button */}
        </Button>
      </div>
    </>
  );
}

export default FormAiSubmit;
