import React from "react";

import { DescriptionHoverCard } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import { Label } from "@/components/ui/label";
import { inputComponents } from "@/constants/dynamic-inputs";
import { type TemplateAPIResponse } from "@/refactor_lib/types/api/v1/TemplateAPI";

type props = {
  param: TemplateAPIResponse["allTemplates"]["params"][0];
  onChangeValue(value: string | number): void;
};

function TemplateModalFormFields({ param, onChangeValue }: props) {
  const Field = inputComponents[param?.Type]
    ? inputComponents[param?.Type]
    : inputComponents.string;

  return (
    <div className="col gap-label-space">
      <Label className="w-full row text-nowrap gap-1">
        {param?.Label || "Target tex"}
        <RenderIf isTrue={!!param?.Description}>
          <DescriptionHoverCard description={param?.Description} />
        </RenderIf>
      </Label>
      <div className="max-w-md">
        <Field
          id=""
          description={param?.Description}
          placeholder={param?.Description}
          isAdvance={false}
          onChangeValue={onChangeValue}
          order={1}
          type={param?.Type}
        />
      </div>
    </div>
  );
}

export default TemplateModalFormFields;
