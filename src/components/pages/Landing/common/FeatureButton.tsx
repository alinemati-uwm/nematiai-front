"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import { Landing_btn } from "@/components/ui/landing-btn";
import { cn } from "@/lib/utils";
import { btnFeature } from "@/constants/Landing";
import { useGetDictionary } from "@/hooks";

export default function FeatureButton() {
  const {
    common: { try_, ai, chat, bot, icon },
  } = useGetDictionary();
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const selectedButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedButtonRef.current && containerRef.current) {
      const container = containerRef.current;
      const selectedButton = selectedButtonRef.current;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = selectedButton.getBoundingClientRect();

      if (
        buttonRect.left < containerRect.left ||
        buttonRect.right > containerRect.right
      ) {
        container.scrollTo({
          left:
            selectedButton.offsetLeft -
            container.clientWidth / 2 +
            selectedButton.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [selectedFeature]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(prevLoading => !prevLoading);
      if (selectedFeature === btnFeature.length - 1) {
        setSelectedFeature(0);
      } else {
        setSelectedFeature(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedFeature]);

  return (
    <>
      <div className="relative   ">
        <div
          id="btn-container"
          ref={containerRef}
          className="mb-6 flex rounded-lg snap-start  justify-between gap-x-4 overflow-x-auto overflow-y-hidden xl:flex-row hide-scrollbar"
        >
          <div className="flex w-full gap-x-3 justify-evenly mx-4">
            {btnFeature.map((name, index) => (
              <div
                key={name.name}
                ref={index === selectedFeature ? selectedButtonRef : null}
                className={cn(
                  "flex rounded-lg items-center  z-10 relative h-8 max-h-20 lg:h-16 xl:h-20 lg:w-full gap-x-2 text-sm font-medium leading-tight text-label-light xl:text-base",
                )}
              >
                <div className="w-full h-full  py-0.5  xl:px-[3.5px] xl:py-[3.5px] ">
                  <Landing_btn
                    className="h-full border z-10 !bg-[#120821] px-3  w-24 lg:w-full lg:hover:bg-black  gap-x-1 lg:gap-x-2 text font-[400]  leading-tight !text-white xl:text-xlarge whitespace-nowrap"
                    onClick={() => setSelectedFeature(index)}
                  >
                    <AppIcon
                      icon={name.Icon}
                      width={36}
                      height={36}
                      className="w-4 lg:w-9"
                    />
                    {ai + name.name}
                  </Landing_btn>
                </div>
                {selectedFeature === index && (
                  <div className="absolute w-full h-full border rounded-lg -z-50 top-0 left-0 bg-gradient animate-loading"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse  lg:flex-row  rounded-xl h-auto  lg:mx-10 lg:gap-20 lg:py-20">
          <div className="flex flex-col gap-4 lg:gap-6 mx-4  lg:w-[50%]">
            <div className=" flex">
              <h2 className="flex items-center gap-x-3 text-center text-large text-white lg:text-2xl lg:font-bold min-[1920px]:text-4xl">
                <div className="w-fit rounded-lg  p-2 bg-glass-dark xl:p-3.5 xl:text-4xl xl:text-white">
                  <AppIcon icon={btnFeature[selectedFeature].Icon} />
                </div>
                <span className="text-shadow-custom-purple text-2xl lg:text-4xl font-[600]">
                  {ai + btnFeature[selectedFeature].name}
                </span>
              </h2>
            </div>
            <div className="h-[300px] lg:h-[250px]">
              <span className="sub-title-color text-justify text-base md:text-large !text-landing-muted leading-tight lg:text-sm lg:leading-tight 2xl:text-large">
                {btnFeature[selectedFeature].description}
                <Link
                  className="text-landing-primary"
                  href={btnFeature[selectedFeature].link}
                >
                  {btnFeature[selectedFeature].name === chat
                    ? try_ + ai + btnFeature[selectedFeature].name + bot
                    : try_ + ai + btnFeature[selectedFeature].name}
                </Link>
              </span>
            </div>
            <Link
              className="z-10 flex justify-center lg:justify-start mt-12 lg:pt-0"
              href="/login"
            >
              <Landing_btn
                variant="default"
                size="lg"
                className="lg:w-[180px] md:w-[50%] w-full h-12 lg:h-12 "
              >
                {try_ + ai + btnFeature[selectedFeature].name}
              </Landing_btn>
            </Link>
          </div>
          <div className="mb-6 w-full rounded lg:w-[50%]">
            <Image
              src={btnFeature[selectedFeature].mobileImage}
              alt={btnFeature[selectedFeature].name + icon}
              width={300}
              height={400}
              className="max-[420px]:object-fill min-[420px]:object-contain lg:mb-20 h-[194px] w-full lg:hidden"
            />
            <div className="h-full w-[80%] block items-start  justify-start">
              <Image
                src={btnFeature[selectedFeature].image}
                alt={btnFeature[selectedFeature].name + icon}
                width={300}
                height={400}
                layout="responsive"
                quality={100}
                className="hidden  lg:flex rounded-lg "
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
