import React from "react";

import Image from "next/image";

import AppBadge from "@/components/ui/AppBadge";
import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";
import { type ModelAPIResponse } from "@/refactor_lib/types/api/v1/ModelAPI";

import ModelSelectorFrame from "../../Frame";

type props = {
  data: ModelAPIResponse["getAllModels"][0]["models"][0];
};

function SelectorItemPopover({
  data: {
    name,
    description,
    icon,
    commercial,
    input_token,
    output_token,
    context_windows,
  },
}: props) {
  const {
    components: { select_engine: dictionary },
  } = useGetDictionary();

  const options = {
    [dictionary.model_input]: input_token,
    [dictionary.model_output]: output_token,
    [dictionary.model_context_window]: context_windows,
  };

  return (
    <div className="">
      <ModelSelectorFrame className="flex-col gap-y-2 min-w-[230px] p-2">
        <div className="flex flex-row gap-x-2 items-start">
          <Image
            src={icon}
            alt=""
            width={20}
            height={20}
            className="rounded-full"
          />
          <div className="flex flex-col gap-y-2 mt-0.5">
            <AppTypo variant="headingXXS">{name}</AppTypo>
            <AppTypo variant="small" color="secondary">
              {description}
            </AppTypo>
            {commercial && (
              <div className="w-full flex justify-start">
                <AppBadge variant="light" font="light" color="success">
                  Commercial
                </AppBadge>
              </div>
            )}
          </div>
        </div>

        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="spacing-row p-1 bg-holder-lighter rounded">
            <span className="text-muted-foreground text-sm">{key}:</span>
            <span className="text-sm">
              {value}
              {" " + dictionary.token}
            </span>
          </div>
        ))}

        {/* <Button variant="outline" className="flex flex-row items-center">
					<span>Learn more</span>
					<AppIcon icon="mdi:arrow-right" width={16} height={16} />
				</Button> */}
      </ModelSelectorFrame>
    </div>
  );
}

export default SelectorItemPopover;
