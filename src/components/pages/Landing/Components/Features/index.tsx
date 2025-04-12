"use client";

import React from "react";

import FeatureButton from "@/components/pages/Landing/common/FeatureButton";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

const Features = () => {
  const {
    components: {
      landing: { feature_title_1, feature_title_2, feature_title_3 },
    },
  } = useGetDictionary();

  return (
    <section
      className={cn(
        "  lg:mx-16 gap-5 lg:gap-16 pb-10 lg:pb-0  z-10 relative  rounded-lg bg-glass-dark  backdrop-blur-sm pt-6 lg:pt-12  flex flex-col justify-center translate-x-0 opacity-100 transition-all duration-700 ",
      )}
    >
      {/*Title section*/}
      <TitleSection
        title={feature_title_1}
        titlePrimary={feature_title_2}
        subTitle={feature_title_3}
      />

      <div className=" lg:mt-[0] z-10">
        {/*buttons */}
        <FeatureButton />
      </div>

      {/*<div*/}
      {/*  className="hero-absolute-left lg:hidden absolute top-0 left-0 -z-0 w-[140px] h-[840px]   rounded-full" />*/}
    </section>
  );
};
export default Features;
