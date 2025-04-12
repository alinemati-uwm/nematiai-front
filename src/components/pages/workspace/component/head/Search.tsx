import React, { useContext } from "react";

import { useDebounceCallback } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

import WorkspaceContext from "../../context";

function HeadSearch() {
  // Access search state and update method from workspace context
  const {
    states: { search },
    methods: { updateState },
  } = useContext(WorkspaceContext);

  // Fetch dictionary data for placeholder text
  const {
    page: {
      workspace: { apps_title, search_in },
    },
  } = useGetDictionary();

  // Debounce search input to avoid frequent updates
  const searchFn = useDebounceCallback(
    e => updateState("search", e.target.value), // Update search state after debounce
    1000, // 1-second debounce delay
  );

  return (
    <div className="w-[200px] sm:w-[300px]">
      <Input
        icon="mingcute:search-line" // Add a search icon
        className="w-full"
        onChange={searchFn} // Trigger debounced search on input change
        defaultValue={search} // Set default value from state
        placeholder={`${search_in} ${apps_title}`} // Dynamic placeholder text
      />
    </div>
  );
}

export default HeadSearch;
