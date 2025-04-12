import React from "react";

import { v4 as uuidv4 } from "uuid";

import { Label } from "@/components/ui/label";
import { inputComponents } from "@/constants/dynamic-inputs";
import { useGetDictionary } from "@/hooks";
import { type ModelParamsItem } from "@/services/types";

type props = {
  fields: Record<string, ModelParamsItem>;
  values: Record<string, any>;
  setValue(type: string, value: any): void;
  quantity?: number;
};

function HandleOptions({ fields, setValue, values, quantity }: props) {
  // Get the dictionary for API keys (labels) for field names
  const { api_keys } = useGetDictionary();

  // Function to generate the input field for each parameter
  const getField = (el: string, key: number) => {
    // Retrieve the model parameter details for the field (e.g., type, enum, minimum/maximum values)
    const element: ModelParamsItem = fields[el];
    // Get the appropriate component to render based on the field type

    const Components = inputComponents[element.type];
    if (!Components) {
      return;
    }

    return (
      <>
        {/* Label for the field, using the dictionary value for the label */}
        <Label>{api_keys[element.label as keyof typeof api_keys]}</Label>

        {/* Render the appropriate input component based on the type of the field */}
        <Components
          type={element.type} // Input type (e.g., text, number, etc.)
          name={api_keys[element.label as keyof typeof api_keys]} // Name attribute for the input
          order={key + 1} // Order of the field (for layout purposes)
          disabled={Boolean(quantity && el === "n")} // Disable the field based on conditions
          id={uuidv4()} // Unique ID for the input element
          description={api_keys[element.label as keyof typeof api_keys]} // Description for the field
          value={values && values[el] ? values[el] : ""} // Value of the field, using the provided `values` prop
          onChangeValue={value => setValue(el, value)} // Function to update the field value
          options={
            element.enum
              ? element.enum.map(item => ({ id: item, value: item }))
              : []
          } // Enum options if available
          {...{
            ...(!!element.minimum && { min: element.minimum }), // Minimum value
            ...(!!element.maximum && { max: element.maximum }), // Maximum value
            ...(!!element.step && { step: element.step }), // Step value for numeric inputs
          }}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row lg:flex-row md:flex-col justify-between flex-wrap gap-y-2">
      {/* Iterate over each field in the `fields` object and render a corresponding input component */}
      {Object.keys(fields).map((el, key) => (
        <div
          className="w-full sm:w-[48.8%] md:w-full lg:w-[48.6%] gap-label-space flex flex-col"
          key={key}
        >
          {/* Render the field using the `getField` function */}
          {getField(el, key)}
        </div>
      ))}
    </div>
  );
}

export default HandleOptions;
