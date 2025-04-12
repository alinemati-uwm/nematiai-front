import React, { useState } from "react";

import { useDebounceCallback } from "usehooks-ts";

import { BannerWithSearch } from "@/components/shared";

import TemplateCategory from "./components/category/TemplateCategory";
import CreateTemplateButton from "./components/CreateTemlplateButton";
import TemplateList from "./components/list/TemplateList";
import TemplateContentContext, {
  type templateContentContextProps,
} from "./context";

type props = Pick<templateContentContextProps["methods"], "callbackMethod">;

function TemplateContent({ callbackMethod }: props) {
  // Initialize state for 'category' and 'search' with default values
  const [States, setStates] = useState<templateContentContextProps["states"]>({
    category: {
      id: -1,
      name: "",
    },
    search: null,
  });

  // Define a debounced function to update state after 500ms delay
  const debounced = useDebounceCallback(setStates, 500);

  // Update a specific part of the state using a key and value
  const updateState = <T extends keyof templateContentContextProps["states"]>(
    key: T,
    value: templateContentContextProps["states"][T],
  ) => setStates(prev => ({ ...prev, [key]: value }));

  return (
    // Context provider to share 'states' and 'methods' (like updateState) throughout the component tree
    <TemplateContentContext
      value={{ states: States, methods: { updateState, callbackMethod } }}
    >
      {/* Main container with vertical spacing between elements */}
      <div className="flex flex-col gap-y-6">
        {/* Banner with search input */}
        <BannerWithSearch
          // When the search input changes, update the 'search' state after a debounce
          onChangeText={value =>
            debounced(prev => ({ ...prev, search: value }))
          }
        />

        {/* Layout for category selection and template creation button */}
        <div className="flex flex-row md:gap-x-12 justify-between items-center">
          {/* Template category, its width depends on 'callbackMethod' */}
          <div
            className={`${callbackMethod ? "w-full" : "sm:w-[60%] lg:w-[65%] xl:w-[75%] 2xl:w-[85%]"}`}
          >
            <TemplateCategory />
          </div>

          {/* Show the create button only if 'callbackMethod' is not passed */}
          {!callbackMethod ? <CreateTemplateButton /> : null}
        </div>

        {/* Template list component */}
        <TemplateList />
      </div>
    </TemplateContentContext>
  );
}

export default TemplateContent;
