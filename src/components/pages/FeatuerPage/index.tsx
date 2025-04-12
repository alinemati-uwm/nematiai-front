"use client";

import React, { useRef } from "react";

import Link from "next/link";

import { Landing_btn } from "@/components/ui/landing-btn";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { featuersData } from "@/constants/featuers";
import { useGetDictionary } from "@/hooks";

import Footer from "../Landing/layout/Footer";
import Navbar from "../Landing/layout/Navbar";
import ImageSection from "./server-components/ImageSection";
import LangSection from "./server-components/LangSection";
import TextSection from "./server-components/TextSection";

export default function FeatuerPage({ params }: { params: string }) {
  const firstStepRef = useRef<HTMLDivElement>(null);

  const { isIntersecting: firstStepIsIntersection } = useIntersectionObserver(
    firstStepRef,
    { threshold: 0.1 },
  );
  const {
    common: { try_, ai, compony_name },
  } = useGetDictionary();
  return (
    <>
      <div className=" w-auto h-auto  bg-gradient-to-br from-[#3C147580] from-25%   via-[#08020f80] via-40%  to-[#3C147580] to-65% ">
        <Navbar />
        <div className="">
          <div className="flex flex-col lg:mx-[100px] pt-20  ">
            <div className="flex flex-col gap-0  lg:gap-0 px-5  md:bg-glass-dark lg:px-16 lg:py-12 rounded-t ">
              {featuersData.map(item => {
                if (item.name === params) {
                  return (
                    <>
                      <div
                        key={item.name}
                        className="w-full flex flex-row gap-[24px] lg:gap-[41px] h-auto"
                      >
                        <div
                          ref={firstStepRef}
                          className={cn(
                            "relative lg:ml-4 flex items-center justify-center  h-0 w-2   bg-custom-gradient",
                            firstStepIsIntersection &&
                              " transition-all h-auto duration-700",
                          )}
                        >
                          <div className="absolute top-0 w-5 h-5 rounded-full bg-landing-primary shadow-2xl"></div>
                        </div>
                        <TextSection item={item} />
                      </div>
                      <ImageSection item={item} />
                      <LangSection
                        try_compony_name={try_ + compony_name}
                        params={params}
                      />
                      <Link
                        href={
                          item.name === "chatbot" ? "/chat" : `/${item.name}`
                        }
                        className=" flex justify-center items-center"
                      >
                        <Landing_btn
                          size="lg"
                          className=" mt-10 relative md:bottom-8 lg:bottom-0 capitalize"
                        >
                          {try_ + ai + item.name}
                        </Landing_btn>
                      </Link>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
