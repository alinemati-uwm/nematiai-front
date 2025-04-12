import React, { useRef } from "react";

import { useMediaQuery, useResizeObserver } from "usehooks-ts";

import usePromptLibrary from "@/components/pages/template/hooks/usePromptLibrary";

import TemplateCategoryContainer from "./TemplateCategoryContainer";
import TemplateMore from "./TemplateMore";

function TemplateCategory() {
  const { category } = usePromptLibrary(); // Hook to retrieve category data
  const ref = useRef<HTMLDivElement>(null); // Reference to the container element
  const isXs = useMediaQuery("(max-width: 380px)");

  const { width = 0 } = useResizeObserver({
    // @ts-ignore
    ref,
  });

  // Helper function to calculate the number of categories to display based on the container width and breakpoint
  const limit = () => {
    const boxWidth = 150; // Set the width of each category box depending on whether the side panel is open
    return isXs || !width ? 0 : Math.round(width / boxWidth) - 1; // Calculate the number of items to display based on the width
  };

  return (
    <div ref={ref} className="flex flex-row gap-x-2 items-center">
      {/* Display the "All Prompt" category */}
      <TemplateCategoryContainer id={-1} name="All Prompt" />
      {/* Map through category data and display each category container, limiting the number based on the screen size */}
      {category.data
        ? category.data.data
            .slice(0, limit() ?? 0) // Slice the categories based on the limit
            .map((el, key) => <TemplateCategoryContainer key={key} {...el} />)
        : null}
      {/* Display "More" button */}
      <TemplateMore maxItem={limit() ?? 0} />
    </div>
  );
}

export default TemplateCategory;
