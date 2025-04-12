import React from "react";

import { cn } from "@/lib/utils";

import { type typeTone } from "../../typs";
import { listTone } from "../constants";
import Tone, { type toneProps } from "./Tone";

type props = Pick<typeTone, "addToSelected" | "selectedTone"> & {
  classnames?: Partial<{
    box: string;
    item: toneProps["classnames"];
  }>;
};

export default function ListTone({
  selectedTone,
  addToSelected,
  classnames,
}: props) {
  return (
    <div className={cn("grid grid-cols-3 gap-1 mb-1", classnames?.box)}>
      {listTone.map((item, index) => {
        return (
          <Tone
            key={"Tone_" + index}
            selectedTone={selectedTone}
            addToSelected={addToSelected}
            classnames={classnames?.item}
            name={item.name}
            image={item.image}
            value={item.value}
          ></Tone>
        );
      })}
    </div>
  );
}
