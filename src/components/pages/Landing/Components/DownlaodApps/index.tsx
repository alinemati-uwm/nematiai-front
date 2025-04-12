//TODO:fixed here
import React from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";

const DownloadApp = () => {
  return (
    <div className="padding-y relative padding-x z-10 backdrop-blur-sm ">
      <div className="absolute inset-0 z-0">
        <div className="hero-absolute-right absolute top-0 right-0 w-[10%] h-full rounded-full z-0" />
        <div className="hidden lg:flex h-[50%] xl:h-[90%] absolute top-0 left-0 z-0">
          <Image
            src="/images/backgrounds/group-51.png"
            width={1000}
            height={450}
            className="w-full h-full"
            alt="landing page"
          />
        </div>
      </div>
      <div className="relative z-10 bg-glass-dark mx-0 flex w-full flex-col justify-center rounded-xl px-6 py-10  lg:mx-auto lg:py-16 ">
        <div className="mb-12 flex flex-col items-center justify-center gap-y-6 text-white">
          <span className="text-large font-[500] leading-normal lg:text-4xl lg:font-medium text-shadow-custom-purple">
            Start your AI <span className="text-primary">Nerd Studio </span> Now
          </span>
        </div>
        <div className="flex w-full gap-12 flex-col items-center justify-center">
          <div className="mb-6 flex flex-col gap-6 md:flex-row">
            <Button className="!w-[241px] lg:!w-[272px] h-10 lg:h-16 text-large">
              Download
            </Button>

            <Button className=" !w-[241px] lg:!w-[272px]  text-large h-10 bg-white text-label-light lg:h-16 hover:bg-primary-dark hover:text-white transition-all">
              Extension
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
