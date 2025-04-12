"use client";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import TitleAndModels from "./server-compoents/TitleAndModels";

const MainClientComp = () => {
  const {
    components: {
      landing: { gpts_title },
    },
  } = useGetDictionary();

  return (
    <div
      className={cn(
        "flex flex-col my-6 lg:my-0   relative items-center justify-center min-h-[209px] lg:min-h-[453px] gap-12 z-10 translate-x-0 opacity-100 transition-all duration-700",
      )}
    >
      {/* <div className="gradient-gpts absolute right-0 z-40  h-full w-3/12  bg-opacity-50"></div>
			<div className="gradient-gpts absolute left-0 z-40 h-full  w-3/12 rotate-180 bg-opacity-50 "></div> */}

      <TitleAndModels gpts_title={gpts_title} />
    </div>
  );
};

export default MainClientComp;
