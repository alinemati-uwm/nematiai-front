"use client";

import { useGetDictionary } from "@/hooks";

import Buttons from "./server-components/Buttons";
import HeroImage from "./server-components/HeroImage";
import StarImage from "./server-components/StarImage";
import TitleAndDescription from "./server-components/TiteAndDescription";

const MainClientComp = () => {
  const {
    common: { download, start_chat },
    components: {
      landing: { main_title, head_title },
    },
  } = useGetDictionary();
  return (
    <header className=" relative w-full  overflow-hidden lg:px-16 z-10  translate-y-0  transition-all duration-1000">
      <StarImage />

      <div className=" z-1 w-full flex flex-col h-auto items-center lg:flex-row  px-3 md:px-0 bg-glass-dark rounded-lg  ">
        {/*COL LEFT*/}
        <div className="z-2 flex gap-4   lg:gap-10   min-h-[480px]  z-20 lg:w-1/2 text-justify items-center justify-center lg:items-start lg:justify-start flex-col lg:mx-12">
          <div className="my-3 lg:w-full w-[90%]  h-auto">
            <TitleAndDescription
              head_title={head_title}
              main_title={main_title}
            />
          </div>

          <Buttons download={download} start_chat={start_chat} />
        </div>

        {/*avatar image*/}
        <HeroImage />
      </div>
    </header>
  );
};
export default MainClientComp;
