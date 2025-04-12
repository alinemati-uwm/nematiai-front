import React from "react";

import { SelectAndDrawer } from "@/components/shared";
import AppTypo from "@/components/ui/AppTypo";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

function ImageTemplatesHead() {
  // Fetching the dictionary values for 'search' and 'sort_by' from the page data
  const {
    page: {
      chat: { search }, // The placeholder text for the search input
      image: { sort_by }, // The label for the sorting options
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-row justify-between gap-x-2 items-center">
      {/* Search input field */}
      <div>
        <Input
          type="text"
          icon="tabler:search"
          className="w-auto sm:w-[220px]"
          placeholder={search}
        />
      </div>

      {/* Sorting options */}
      <div className="flex flex-row gap-x-2 items-center">
        {/* Displaying the 'sort_by' label (e.g. 'Sort by') */}
        <AppTypo className="whitespace-nowrap hidden md:visible">
          {sort_by}{" "}
          {/* The sort_by text is dynamically set from the dictionary */}
        </AppTypo>

        {/* Dropdown for sorting options */}
        <SelectAndDrawer
          value="" // Initially empty value
          setValue={v => console.log("params", v)} // Logs the selected value when changed
          // Sorting options - 'View', 'Star', and 'Popular'
          items={["View", "Star", "Popular"].map(el => ({
            id: el, // id is the value itself
            value: el, // value is the label shown
          }))}
        />
      </div>
    </div>
  );
}

export default ImageTemplatesHead;
