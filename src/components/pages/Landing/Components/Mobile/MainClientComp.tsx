"use client";

import React, { useRef } from "react";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import BoxContents from "./server-components/BoxContents";

const MainCleintComp = () => {
  const {
    common: { download, brand_name },
    components: {
      landing: { mobile_app, play_store, apple_store, download_now },
    },
  } = useGetDictionary();

  const elementRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(elementRef, {
    threshold: 0.1,
  });

  return (
    <div ref={elementRef} className="flex flex-col   lg:px-16 mt-10 ">
      {/*Title section*/}
      <div className="w-full h-[110px] lg:ml-[100px] z-10 mb-10 lg:mb-20">
        <div
          className={cn(
            "  lg:ml-4  relative flex items-center justify-center  h-0  w-2 bg-custom-gradient",
            isIntersecting && " transition-all h-[100px] duration-700",
          )}
        >
          <div className="absolute bottom-0 w-5 h-5 rounded-full bg-[#9373EE] shadow-2xl"></div>
        </div>
      </div>
      <div
        id="download"
        className={cn(
          "rounded-lg w-full z-10 backdrop-blur-sm flex bg-glass-dark flex-col-reverse gap-4 lg:flex-row justify-between items-center opacity-100 scale-100 transition-all duration-700 `",
        )}
      >
        <BoxContents
          download={download}
          download_now={download_now}
          brand_name={brand_name}
          mobile_app={mobile_app}
          play_store={play_store}
          apple_store={apple_store}
        />
      </div>
    </div>
  );
};
export default MainCleintComp;
