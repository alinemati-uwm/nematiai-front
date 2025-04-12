import React from "react";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import ImageTemplatesHead from "./components/Head";
import ImageTemplates from "./components/list/List";

function MainImageTemplates() {
  // Fetch dictionary value for the label of the favorite template button
  const {
    page: {
      dashboard: { favorite_template_button_label }, // The label text for the favorite template button
    },
  } = useGetDictionary();

  return (
    <div className="flex flex-col gap-y-5">
      {/* Display the label for the favorite template button */}
      <AppTypo variant="headingS">{favorite_template_button_label}</AppTypo>

      {/* Display the header for the image templates section */}
      <ImageTemplatesHead />

      {/* Display the image templates themselves */}
      <ImageTemplates />
    </div>
  );
}

export default MainImageTemplates;
