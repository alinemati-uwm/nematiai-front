import React from "react";

import Image from "next/image";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

type props = {
  title: string;
  items: {
    src: string;
  }[];
};

function ExploreMediaCard({ items, title }: props) {
  return (
    <div className="flex flex-col bg-muted rounded p-2 gap-y-1.5 w-full">
      <div className="flex flex-row justify-between">
        <AppTypo variant="headingXS">{title}</AppTypo>
        <AppIcon icon="material-symbols:add-rounded" width={16} height={16} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((el, key) => (
          <div
            key={key}
            className={`h-[100px] relative ${key === 0 ? "col-span-full" : ""}`}
          >
            <Image
              src={el.src}
              alt=""
              layout="fill"
              unoptimized
              className="absolute w-full rounded object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreMediaCard;
