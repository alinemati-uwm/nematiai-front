import React, { useContext } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import TemplateContentContext from "../../context";

function TemplateCategoryContainer({
  id,
  name,
}: Omit<TemplateAPIResponse["getAllCategoriesTypes"], "icon">) {
  const {
    states,
    methods: { updateState },
  } = useContext(TemplateContentContext);

  return (
    <Button
      variant="secondary"
      // selected={states.category.id === id}
      className={cn(
        "w-[120px] sm:w-[130px]",
        states.category.id === id && "bg-primary-lighter !text-label-dark",
      )}
      onClick={() => {
        updateState("category", { id: id ?? null, name });
      }}
    >
      {name}
    </Button>
  );
}

export default TemplateCategoryContainer;
