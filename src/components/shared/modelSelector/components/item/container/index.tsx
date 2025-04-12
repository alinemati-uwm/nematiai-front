import React, { useContext } from "react";

import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";

import RenderIf from "@/components/shared/RenderIf";
import AppBadge from "@/components/ui/AppBadge";
import AppTypo from "@/components/ui/AppTypo";
import { useEngineFeatures } from "@/hooks/useEngineFeatures";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { useGetDictionary } from "@/hooks";
import { type ModelAPIResponse } from "@/refactor_lib/types/api/v1/ModelAPI";

import AppModelSelectorContext from "../../../context";
import SelectorItemPopover from "./Popover";

type props = {
  data: ModelAPIResponse["getAllModels"][0]["models"][0];
};

function ModelSelectorItemContainer({ data }: props) {
  const { setSelectedEngine } = useFormStore();
  const {
    methods: { updateState },
    props: { model },
  } = useContext(AppModelSelectorContext);
  const { selectedEngine } = useEngineFeatures();
  const {
    common: { pricey },
  } = useGetDictionary();

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <div
          className={`h-10 px-1 rounded cursor-pointer flex flex-row items-center hover:bg-primary-lighter gap-x-2 justify-between ${selectedEngine === data.value ? "bg-primary-lighter" : ""}`}
          onClick={() => {
            if (model?.onChange) model?.onChange(data);
            else setSelectedEngine(data.value);
            updateState("dropdown", false);
          }}
        >
          <div className="flex flex-row gap-x-2 items-center">
            {data.icon ? (
              <Image
                src={data.icon}
                alt=""
                width={16}
                height={16}
                className="rounded-full"
              />
            ) : null}
            <AppTypo>{data.name}</AppTypo>
          </div>

          <RenderIf isTrue={data.pricey}>
            <AppBadge variant="light" color="danger">
              {pricey}
            </AppBadge>
          </RenderIf>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content side="right" sideOffset={16} className="z-50">
          {data ? <SelectorItemPopover data={data} /> : ""}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export default ModelSelectorItemContainer;
