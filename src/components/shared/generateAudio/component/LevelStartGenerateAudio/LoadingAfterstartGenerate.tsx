import React, { useState } from "react";

import Image from "next/image";

export default function LoadingAfterstartGenerate() {
  const [select, setSelect] = useState<boolean>(false);

  return (
    <>
      <Image
        src="/images/generateAudio/loading.gif"
        width={500}
        height={288}
        alt="Tone "
        quality={100}
        className=""
      />

      <div className="py-3 pb-4">
        <div className="flex justify-center items-center space-x-0.5">
          <div className="dot w-1 h-2 bg-primary rounded-sm animate-bounce1"></div>
          <div className="dot w-1 h-2  bg-primary  rounded-sm animate-bounce2"></div>
          <div className="dot w-1 h-2  bg-primary  rounded-sm animate-bounce3"></div>
          <div className="dot w-1 h-2  bg-primary  rounded-sm animate-bounce4"></div>
          <div className="dot w-1 h-2  bg-primary  rounded-sm animate-bounce5"></div>
        </div>
      </div>
    </>
  );
}
