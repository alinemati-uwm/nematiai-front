import React from "react";

import Image from "next/image";

import HowToWork from "@/components/pages/about-us/components/how-to-work";
import FAQ from "@/components/pages/Landing/common/FAQ";
import Footer from "@/components/pages/Landing/layout/Footer";
import Navbar from "@/components/pages/Landing/layout/Navbar";
import { getLandingData } from "@/services/static-pages/landing";
import { type LangParams } from "@/services/types";

import HeroSection from "./components/hero-section";
import Office from "./components/office";
import TeamsSection from "./components/teams";

async function AboutUsPage({ params: { lang } }: LangParams) {
  const data = await getLandingData();

  return (
    <>
      <div
        lang={lang}
        className="relative mx-auto h-full w-full max-w-[1920px] overflow-x-hidden bg-[#07081C]"
      >
        <Navbar />
        <main className="relative  ">
          <HeroSection />
          <div className="relative z-20 mx-[5%] backdrop-blur-sm hidden bg-glass-dark backfrop-blur-sm -translate-y-16 xl:-translate-y-16 items-center justify-center rounded-md px-5 py-8 shadow-xl md:flex text-white border border-white">
            <div className=" items-center justify-center gap-4 hidden 2xl:flex ">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-base font-normal">
                  titles about contacting to the company comes here
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 ">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-base font-normal">
                  titles about contacting to the company comes here
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-base font-normal">
                  titles about contacting to the company comes here
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-base font-normal">
                  titles about contacting to the company comes here
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-full relative ">
            <div className="hidden lg:flex absolute -top-[300px] left-0 z-10">
              <Image
                src="/images/backgrounds/Group1315.png"
                width={1000}
                height={450}
                className="w-full h-full transform scale-x-[-1]"
                alt="landing page"
              />
            </div>
            <div className="hero-absolute-left hidden lg:flex absolute top-0 left-0 z-0 w-[540px] h-[240px] rounded-full" />

            <TeamsSection />
            <HowToWork />
            {/*<div*/}
            {/*  className="hidden lg:flex absolute top-[1400px] -left-[200px] z-10">*/}
            {/*  <Image src={"/images/backgrounds/Group1316.png"} width={600}*/}
            {/*         height={550}*/}
            {/*         className="w-full h-full transform scale-x-[-1] opacity-[50%]" alt={"landing page"} />*/}
            {/*</div>*/}
            <div className="hero-absolute-left  lg:flex absolute top-0 left-0 z-0 w-[540px] h-[240px]   rounded-full" />

            <Office />
          </div>

          {data && data.faqs && (
            <div className="relative">
              <FAQ faqs={data.faqs} />

              <div className="hidden lg:flex absolute -top-[100px] left-0 z-1">
                <Image
                  src="/images/backgrounds/Group1316.png"
                  width={500}
                  height={350}
                  className="w-full h-full transform scale-x-[-1]"
                  alt="landing page"
                />
              </div>
              <div className="hero-absolute-left  lg:flex absolute top-0 left-0 z-0 w-[540px] h-[240px]   rounded-full" />
            </div>
          )}

          <Footer />
        </main>
      </div>
    </>
  );
}

export default AboutUsPage;
