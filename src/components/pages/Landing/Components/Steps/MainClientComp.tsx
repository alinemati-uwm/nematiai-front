"use client";

import { useRef } from "react";

import TitleSection from "@/components/pages/Landing/common/TitleSection";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import Boxes from "./server-components/Boxes";

const MainClientComp = () => {
  const {
    components: {
      landing: { steps_title_1, steps_title_2, steps_title_3 },
    },
  } = useGetDictionary();
  const elementRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(elementRef, {
    threshold: 0.1,
  });
  return (
    <section
      className={cn(
        " pt-12 lg:pt-16 relative flex flex-row  lg:mx-[120px]  items-center justify-center  ",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col gap-6 lg:gap-12    opacity-100 transition-all duration-700",
        )}
      >
        <TitleSection
          title={steps_title_1}
          titlePrimary={steps_title_2}
          subTitle={steps_title_3}
        />

        <div className="flex w-full flex-col justify-between lg:my-12  gap-6  lg:flex-row  xl:gap-[120px] ">
          <Boxes />
        </div>
      </div>

      <div className="hero-absolute-left lg:hidden absolute top-0 left-0 -z-0 w-[140px] h-[840px]   rounded-full" />
    </section>
  );
};
export default MainClientComp;
