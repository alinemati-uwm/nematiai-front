import React, { useContext } from "react";

import Image from "next/image";

import AiEditorContext from "../context";
import type aiEditorTypes from "../type";

type items = {
  src: string;
  caption: string;
  component: aiEditorTypes["views"];
};

function AiEditorMain() {
  const {
    methods: { updateState },
  } = useContext(AiEditorContext);

  const items: items[] = [
    {
      src: "/images/imageditor/generate_image.jpg",
      caption: "Generate image",
      component: "generateImage",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((el, key) => (
        <div
          key={key}
          className="flex flex-col gap-y-2 cursor-pointer"
          onClick={() => updateState("generateImage")}
        >
          <div className="overflow-hidden h-[180px] rounded relative">
            <Image
              src={el.src}
              alt={el.caption}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center">{el.caption}</div>
        </div>
      ))}
    </div>
  );
}

export default AiEditorMain;
