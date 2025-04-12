import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function BoxContents({
  download,
  brand_name,
  mobile_app,
  play_store,
  apple_store,
  download_now,
}: {
  download: string;
  brand_name: string;
  mobile_app: string;
  play_store: string;
  apple_store: string;
  download_now: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-12 items-center mb-3 lg:mb-0 lg:items-start lg:px-16">
        <div className="hidden lg:flex ">
          <div
            className={cn(
              " w-full items-center justify-center font-[600] flex flex-col gap-3 xl:gap-6",
            )}
          >
            <h2 className=" text-large lg:text-5xl text-shadow-custom-purple text-[#FFFFFF]">
              {download}
              <span className="text-primary"> {brand_name}</span>
              <span>{mobile_app}</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col mx-10 md:w-full   min-w-[265px] max-w-[580px] lg:mx-0 lg:flex-row gap-2 lg:gap-6 justify-center items-center text-white text-base ">
          <Link
            href="https://play.google.com/store/apps/details?id=com.nerdstudio.app"
            target="_blank"
            className="border w-full sm:w-full h-12 rounded-lg flex justify-center items-center cursor-pointer "
          >
            <Image
              src="/images/landing/googlePlay_logo.webp"
              alt="google play icon"
              width={18}
              height={18}
              className=" mr-2 "
              quality={100}
            />
            <p>{play_store}</p>
          </Link>
          <div className="border w-full  h-12 rounded-lg flex justify-center items-center cursor-pointer ">
            <Image
              src="/images/landing/apple_logo.webp"
              alt="apple store icon"
              width={27}
              height={27}
              className=" mr-2 "
              quality={100}
            />
            <p>{apple_store}</p>
          </div>

          <Link
            href="/"
            className="border w-full sm:w-full h-12 rounded-lg flex justify-center items-center cursor-pointer"
          >
            <Image
              src="/images/landing/download_logo.svg"
              alt="direct download icon"
              width={27}
              height={27}
              className=" mr-2"
            />
            <p>{download_now}</p>
          </Link>
        </div>
      </div>

      <Link
        href="/download"
        className="relative flex w-full  lg:w-1/3 xl:w-2/3 2xl:w-1/3  justify-center  "
      >
        <Image
          src="/images/download/mobile_background.webp"
          alt="Schematic of Nerd Studio mobile app"
          width={500}
          height={400}
        />
      </Link>
    </>
  );
}
