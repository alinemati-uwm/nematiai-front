import React, { useContext } from "react";

import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

import TemplateContentContext from "../../../context";
import TemplateButton from "./TemplateButton";
import TemplateCardImage from "./TemplateCardImage";
import TemplateListIcons from "./TemplateListIcons";

type props = {
  template: TemplateAPIResponse["allTemplates"];
};

function TemplateCard({ template }: props) {
  // Access the callback method from the templateContentContext, if available
  const {
    methods: { callbackMethod },
  } = useContext(TemplateContentContext);

  return (
    <div
      key={template.id} // Unique key for the card, ensuring proper rendering in a list
      className={`border p-4 flex flex-col gap-y-2 rounded ${template.template_type === "CustomTemplate" ? "bg-primary-lighter" : ""}`}
    >
      {/* Header section with template's image and topic */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-x-3">
          <div
            className={`${template.template_type === "CustomTemplate" ? "bg-muted-lighter" : ""} rounded`}
          >
            {/* Image section for the template */}
            <TemplateCardImage />
          </div>
          <div className="text-base font-medium">
            {/* Truncated template topic */}
            {template.topic.substring(0, 30)}{" "}
            {template.topic.length > 30 ? "..." : null}{" "}
            {/* Show ellipsis if topic is too long */}
          </div>
        </div>

        {/* If no callback method, show the TemplateListIcons component */}
        {!callbackMethod ? (
          <TemplateListIcons icon={["info", "favorite"]} template={template} />
        ) : null}
      </div>

      {/* Task description with truncation if it's too long */}
      <div className="flex flex-row h-10">
        {template.task.substring(0, 60)}{" "}
        {template.task.length > 60 ? "..." : null}{" "}
        {/* Truncate and add ellipsis for long task */}
      </div>

      {/* Button section */}
      <div className="flex flex-row justify-end gap-x-2">
        {/* Button that triggers actions for the template */}
        <TemplateButton template={template} />
      </div>
    </div>
  );
}

export default TemplateCard;
