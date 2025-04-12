import React, { useContext, useEffect, useState } from "react";

import * as Collapsible from "@radix-ui/react-collapsible";

import { type ModelAPIResponse } from "@/refactor_lib/types/api/v1/ModelAPI";

import AppModelSelectorContext from "../../context";
import ModelSelectorItemContainer from "./container";
import ModelSelectorlabel from "./Label";

type props = {
  model: ModelAPIResponse["getAllModels"][0];
  defaultOpen: boolean;
};

function ModelSelectorItem({ model, defaultOpen }: props) {
  const {
    states: { search },
  } = useContext(AppModelSelectorContext);
  const [isOpen, setIsOpen] = useState<boolean>();

  useEffect(() => {
    defaultOpen && setIsOpen(true);
  }, []);

  return (
    <Collapsible.Root
      defaultOpen={defaultOpen}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-y-1"
    >
      <Collapsible.Trigger className="w-full outline-none ">
        <ModelSelectorlabel isOpen={isOpen!} label={model.name} />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
        {model.models
          .filter(el =>
            search.length
              ? el.name.toLowerCase().search(search.toLocaleLowerCase()) >= 0
              : true,
          )
          .map((el, key) => (
            <div className="w-full outline-none" key={key}>
              <ModelSelectorItemContainer data={el} key={key} />
            </div>
          ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default ModelSelectorItem;
