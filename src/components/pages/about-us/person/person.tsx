"use client";

import React from "react";

import Image from "next/image";

import AboutPerson from "@/components/pages/about-us/person/components/AboutPerson";
import { useGetEmploye } from "@/services/static-pages/contact-us";

import Footer from "../../Landing/layout/Footer";
import HeroSectionPerson from "./components/hero-section-person";
import Information from "./components/informations";

function PersonPage({ personId }: { personId: string }) {
  const { data, isLoading } = useGetEmploye(personId);
  return (
    <>
      {!isLoading && (
        <div className="w-full h-screen relative ">
          <HeroSectionPerson data={data} />

          <div className="w-full flex flex-col lg:flex-row  items-center lg:items-start  md:px-16 md:gap-10 mt-12 ">
            <div className="flex w-full   flex-col  gap-4 items-center justify-start  ">
              <Image
                height={100}
                width={100}
                quality={100}
                layout="responsive"
                className="!w-[221px] !h-[221px] rounded-full  "
                src="/images/imageprofile.png"
                alt=""
              />

              <Information data={data} />
            </div>
            <div className="flex flex-col">
              <AboutPerson data={data} />
            </div>
          </div>
          <div className="mx-4 lg:mx-0 mt-12 lg:mt-[160px]">
            <Footer />
          </div>

          <div className="hero-absolute-left flex absolute top-[1500px] h-[300px] lg:top-[1300px] left-0 z-0 w-[540px] max-w-[100vw] lg:h-[640px]   rounded-full" />
        </div>
      )}
    </>
  );
}

export default PersonPage;
