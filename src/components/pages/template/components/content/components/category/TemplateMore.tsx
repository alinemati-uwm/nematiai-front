import React, { useContext, useState } from "react";

import usePromptLibrary from "@/components/pages/template/hooks/usePromptLibrary";
import AppIcon from "@/components/shared/AppIcon";
import ClickAwayListener from "@/components/shared/ClickAwayListener";

import TemplateContentContext from "../../context";

function TemplateMore({ maxItem }: { maxItem: number }) {
  const [Open, setOpen] = useState(false); // State to track whether the dropdown is open or closed
  const { category } = usePromptLibrary(); // Hook to retrieve category data
  const data = category.data?.data; // Extract the categories from the data

  const {
    methods: { updateState, callbackMethod },
  } = useContext(TemplateContentContext); // Context for updating the state and checking if a callback method exists

  return (
    <div className="relative">
      <ClickAwayListener onClose={() => setOpen(false)}>
        {" "}
        {/* Close the dropdown when clicked outside */}
        <AppIcon
          icon="ri:more-fill" // Icon for the "More" button
          onClick={() => setOpen(prev => !prev)} // Toggle dropdown visibility when clicked
          className="cursor-pointer"
        />
        {Open ? ( // Show the dropdown menu when Open is true
          <div
            className={`w-[190px] mt-5 shadow-xl z-20 overflow-auto p-1 bg-popover absolute ${
              callbackMethod ? "right-0" : "right-1/2 transform translate-x-1/2"
            } max-h-[40vh]`}
          >
            {/* Render categories starting from maxItem index */}
            {data
              ? data.slice(maxItem, data?.length).map((el, key) => (
                  <div
                    key={key}
                    onClick={() => {
                      setOpen(false); // Close the dropdown when a category is clicked
                      updateState("category", {
                        id: el.id,
                        name: el.name,
                      }); // Update the selected category in the context
                    }}
                    className="px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100"
                  >
                    {el.name} {/* Display the category name */}
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </ClickAwayListener>
    </div>
  );
}

export default TemplateMore;
