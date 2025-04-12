"use client";

import React, { useRef } from "react";

import { useParams } from "next/navigation";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { type LandingService } from "@/services/static-pages/landing";

import AvatarPic from "./server-components/AvatarPic";
import FirstServiceStep from "./server-components/FirstServiceStep";
import HeroAndBoxes from "./server-components/HeroAndBoxes";
import SecondServiceStep from "./server-components/SecondServiceStep";

// import { LandingService } from "@/services/landing";

interface Props {
  services?: LandingService[];
}

const MainClientComp = ({ services }: Props) => {
  const { lang } = useParams();
  const {
    components: {
      landing: {
        services_main_title,
        services_first_step_1_5,
        services_first_step_2_5,
        services_second_step_1_5,
        services_second_step_2_5,
        mobile_app,
        Website_app,
        Extention,
        what_is_prompt,
        explor_custom_lib,
      },
    },
  } = useGetDictionary();

  const elementRef = useRef<HTMLDivElement>(null);
  const firstStepRef = useRef<HTMLDivElement>(null);
  const secondStepRef = useRef<HTMLDivElement>(null);
  const thirdStepRef = useRef<HTMLDivElement>(null);

  const { isIntersecting, loaded } = useIntersectionObserver(elementRef, {
    threshold: 0.1,
  });
  const { isIntersecting: firstStepIsIntersection, loaded: firstStepIsLoaded } =
    useIntersectionObserver(firstStepRef, { threshold: 0.1 });
  const {
    isIntersecting: secondStepIsIntersection,
    loaded: secondStepIsLoaded,
  } = useIntersectionObserver(secondStepRef, { threshold: 0.1 });
  const { isIntersecting: thirdStepIsIntersection, loaded: thirdStepIsLoaded } =
    useIntersectionObserver(thirdStepRef, { threshold: 0.1 });

  return (
    <section
      className={cn(
        "  mt-12 z-10  lg:px-16 relative   flex flex-col gap-10 lg:gap-[106px]   lg:justify-between min-[1920px]:py-16 ",
      )}
    >
      <div
        className={cn(
          "flex flex-col bg-glass-dark backdrop-blur-sm rounded-lg w-full  lg:flex-row justify-between items-start translate-x-0 opacity-100 transition-all duration-700",
        )}
      >
        {/*avatar section*/}
        <AvatarPic />
        {/*avatar section*/}

        <HeroAndBoxes
          Extention={Extention}
          Website_app={Website_app}
          mobile_app={mobile_app}
          services_main_title={services_main_title}
        />
      </div>

      {/*service steps section*/}

      <div className=" flex flex-col gap-5 lg:mx-[100px] ">
        {/*first service step*/}

        <FirstServiceStep
          firstStepIsIntersection={firstStepIsIntersection}
          firstStepRef={firstStepRef}
          services_first_step_1_5={services_first_step_1_5}
          services_first_step_2_5={services_first_step_2_5}
          what_is_prompt={what_is_prompt}
        />
        {/*first service step*/}

        {/*second service step*/}
        <SecondServiceStep
          secondStepIsIntersection={secondStepIsIntersection}
          secondStepRef={secondStepRef}
          services_second_step_1_5={services_second_step_1_5}
          services_second_step_2_5={services_second_step_2_5}
          explor_custom_lib={explor_custom_lib}
        />

        {/*second service step*/}

        {/*third step service*/}

        <div ref={thirdStepRef} className={cn("w-full flex flex-col  ")}>
          <div className="w-full flex flex-row gap-6 lg:gap-10 my-5 lg:my-0  h-[100px]  lg:h-[300px]   ">
            <div
              className={cn(
                "relative lg:ml-4 flex items-center justify-center z-10  h-0 w-2   bg-custom-gradient",
                thirdStepIsIntersection &&
                  " transition-all h-[100px] lg:h-[250px] duration-700",
              )}
            ></div>
          </div>
        </div>

        {/*third step service*/}
      </div>
      {/*service section*/}
    </section>
  );
};
export default MainClientComp;
