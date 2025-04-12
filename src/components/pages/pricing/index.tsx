"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Navbar from "@/components/pages/Landing/layout/Navbar";
import { DescriptionHoverCard } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import { Landing_btn } from "@/components/ui/landing-btn";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";
import useGetPricingData from "@/services/static-pages/pricing";
import { type LangParams } from "@/services/types";

import Footer from "../Landing/layout/Footer";

const Pricing = ({ params }: LangParams) => {
  const {
    common: { upgrade, month },
    page: {
      pricing: { pricig, Affordable_plans },
    },
  } = useGetDictionary();
  const data = useGetPricingData();

  //** redirect user to dashboard if has a token and open a upgrade modal **//

  const [isValid, setIsValid] = useState<boolean>();
  //check if user has a token => setIsValid = true in first mount
  useEffect(() => {
    const userSession = LocalStorageManger.getUserSession();
    if (userSession?.access_token) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, []);

  const isOpen = useUiStore.use.openUserPanelDialog();
  const setIsOpen = useUiStore.use.setOpenUserPanelDialog();
  const setActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const router = useRouter();
  //if user has a token redirect to dashboard , else redirect to login
  function handleClick() {
    if (isValid) {
      router.push("/chat");
    } else {
      router.push("/login");
    }
    setIsOpen(!isOpen);
    setActiveMenu("upgrade");
  }

  return (
    <div className=" relative mx-auto h-full max-w-[1920px] overflow-x-hidden  w-full bg-gradient-to-t from-[#3c1475a3] z-10">
      <div className="hidden  h-full max-h-[100vh] w-full items-center justify-center  lg:flex absolute  top-0 left-0 -z-0 ">
        <Image
          src="/images/landing/spiral.webp"
          width={600}
          height={900}
          className=" w-[60%] h-[70%] z-0 "
          alt="spiral background photo of pricing page"
          priority
        />
      </div>
      {/* <div className="hero-absolute-left  hidden lg:flex absolute top-0 left-1/2 z-0 w-[200px] h-screen overflow-y-hidden  rounded-full" /> */}
      <Navbar />
      <main className=" mt-20 min-h-[90%]">
        <div className="w-auto xl:w-screen  flex flex-col  items-center  mx-auto gap-2">
          <div className="text-white md:text-3xl text-2xl font-[600]  z-10">
            {pricig}
          </div>
          <div className="md:text-2xl text-large font-[300]  text-white z-10">
            {Affordable_plans}
          </div>
          <div className="w-full  pb-6 px-4 lg:px-20 gap-3   mt-8 grid   md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-10 backdrop-blur-sm">
            {data?.plans.map(plan => {
              return (
                <div
                  key={plan.title}
                  className={cn(
                    // lg:hover:translate-y-[-13px]
                    "w-full md:max-w-[400px] h-[500px] md:px-8 lg:hover:translate-y-[-15px] duration-300 items-center flex justify-center border rounded mx-auto ",
                    plan.highlight && "bg-[#1F0A5833]",
                  )}
                >
                  <div className="flex flex-col pt-8 pb-5  h-full px-12  sm:mx-[190px]  gap-2  items-center  ">
                    <div className="flex flex-col items-start max-h-20 text-white">
                      <div className="font-[300] text-2xl  mx-auto flex flex-row items-end gap-2 ">
                        {" "}
                        <div className="font-[600] text-3xl">
                          $ {plan.price} /
                        </div>
                        {month}
                      </div>
                      <p className="font-[400] text-3xl mx-auto  ">
                        {plan.title}
                      </p>
                    </div>

                    <div className="flex flex-col ">
                      <ul className="col mb-1 list-item list-disc ps-4 mt-8 ">
                        {plan.features.map(feature => (
                          <li
                            key={feature.title + plan.id}
                            className={cn(
                              "text-large  font-normal  text-primary-lighter w-[230px]",
                            )}
                          >
                            <div className="flex items-start gap-1 ">
                              {feature.title}
                              <RenderIf isTrue={feature.description !== ""}>
                                <DescriptionHoverCard
                                  description={feature.description}
                                  iconSize=".75rem"
                                />
                              </RenderIf>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {plan.price ? (
                      <div className="w-[246px] h-12 rounded-lg bg-primary text-white flex items-center justify-center mt-auto">
                        <Landing_btn
                          onClick={handleClick}
                          size="lg"
                          className={cn(
                            "mt-auto w-full h-full z-10 bg-holder-light hover:bg-primary-dark  hover:!text-white  !text-black",
                            plan.highlight &&
                              "bg-primary   !text-white hover:bg-primary-dark",
                          )}
                        >
                          {upgrade}
                        </Landing_btn>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
