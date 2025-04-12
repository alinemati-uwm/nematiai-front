import React from "react";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

function ExporerArticleHero({ hero }: { hero?: string }) {
  return (
    <div className="h-[30vh] relative w-full ">
      {hero ? (
        <Image
          src={hero}
          alt=""
          layout="fill"
          unoptimized
          className="absolute w-full rounded object-cover"
        />
      ) : (
        <Skeleton className="w-full h-[30vh] " />
      )}
    </div>
  );
}

export default ExporerArticleHero;
