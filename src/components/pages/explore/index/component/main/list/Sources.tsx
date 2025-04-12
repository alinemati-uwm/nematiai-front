import React from "react";

import Image from "next/image";

type props = {
  merge?: boolean;
};

function MainListExlporeSources({ merge = true }: props) {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <Image
        src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
        unoptimized
        alt=""
        width={24}
        height={24}
        className="rounded-full"
      />
      <Image
        src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
        unoptimized
        alt=""
        width={24}
        height={24}
        className={`rounded-full ${merge ? "-ml-4" : ""}`}
      />
      <Image
        src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
        unoptimized
        alt=""
        width={24}
        height={24}
        className={`rounded-full ${merge ? "-ml-4" : ""}`}
      />
      <Image
        src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
        unoptimized
        alt=""
        width={24}
        height={24}
        className={`rounded-full ${merge ? "-ml-4" : ""}`}
      />
      <Image
        src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
        unoptimized
        alt=""
        width={24}
        height={24}
        className={`rounded-full ${merge ? "-ml-4" : ""}`}
      />
    </div>
  );
}

export default MainListExlporeSources;
