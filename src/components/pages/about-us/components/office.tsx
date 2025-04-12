import Image from "next/image";
import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";

const Office = () => {
  return (
    <div className="relative  z-20 mt-12 p-6  space-y-5 bg-transparent py-5 text-center  text-[#181818] ">
      {" "}
      {/* whole container  */}
      <h1 className=" text-4xl  font-bold text-white text-shadow-custom-purple lg:text-4xl lg:font-[500]">
        Visit our offices
      </h1>
      <p className="text-large font-normal text-white pb-6">
        Find us at these location.
      </p>
      <div className=" flex flex-col rounded-lg bg-glass-dark md:flex-row lg:mx-[10%] ">
        {/* box container that has two  div   */}
        <div className=" md:w-1/2 rounded-l ">
          <div className="lg:px-l md:w-2/3 space-y-3 w-full md:px-4 text-start text-sm backdrop-blur-sm  md:m-16 lg:pl-10 lg:pt-3 ">
            <h1 className=" text-3xl font-normal text-white w-full">
              Milwaukee, Wisconsin
            </h1>
            <p className=" text-base font-normal text-[#747474]">
              Find us at these location.
            </p>
            <div className=" w-[268px] space-y-6  text-[#B9BAC0]  lg:space-y-6  ">
              <div className="mt-6 flex items-center justify-start gap-4 ">
                <AppIcon className="h-4 w-4 text-white" icon="fe:phone" />
                <p>(+1) 971 400 2132</p>
              </div>
              <div className="flex items-center justify-start gap-4 ">
                <AppIcon
                  icon="mdi:email-outline"
                  className="h-4 w-4 text-white"
                />
                <p>Support@nerdstudio.ai</p>
              </div>
              <div className="flex items-center justify-start gap-4">
                <AppIcon
                  width={18}
                  className="text-white"
                  icon="codicon:location"
                />
                <p>7343 N Teutonia Ave Milwaukee, WI 53209 United States</p>
              </div>
            </div>
            <div className="mb-6 flex items-center space-x-10 md:space-x-8 justify-center md:justify-start  py-4 ">
              <Link href="https://x.com/nerdstudioai" target="_blank">
                <AppIcon
                  width={16}
                  className="text-[#747474]"
                  icon="si:twitter-line"
                />
              </Link>
              <Link
                href="https://www.instagram.com/nerdstudioai"
                target="_blank"
              >
                <AppIcon
                  width={16}
                  className="text-[#747474]"
                  icon="hugeicons:instagram"
                />
              </Link>
              <AppIcon
                width={16}
                className="text-[#747474]"
                icon="lucide:facebook"
              />
              <Link
                href="https://www.linkedin.com/company/nerdstudioai/"
                target="_blank"
              >
                <AppIcon
                  width={16}
                  className="text-[#747474]"
                  icon="jam:linkedin-square"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-center md:items-start md:justify-start ">
              <Link
                href="/contact"
                className=" w-[85%] text-center rounded-md bg-[#F2EEFD] py-3  text-base tracking-wider font-normal text-[#9373EE] duration-300 hover:bg-[#5729DA] hover:text-white  md:w-[150px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className=" md:w-1/2 w-full max-md:mt-6  flex justify-center">
          <Image
            className="md:rounded-r-lg rounded-lg "
            width={500}
            height={200}
            src="/images/map2.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Office;
