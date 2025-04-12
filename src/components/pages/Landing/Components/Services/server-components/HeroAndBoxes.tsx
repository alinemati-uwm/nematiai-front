import Image from "next/image";
import Link from "next/link";

export default function HeroAndBoxes({
  services_main_title,
  mobile_app,
  Website_app,
  Extention,
}: {
  services_main_title: string;
  mobile_app: string;
  Website_app: string;
  Extention: string;
}) {
  return (
    <>
      <div className="w-full h-full flex flex-col my-auto  items-center justify-center ">
        <h2 className="mb-12 mt-10 lg:mt-[0]  w-[280px] mx-auto lg:w-[80%] h-full   leading-normal max-[1024px]:text-center  text-large lg:text-3xl font-[500] text-shadow-custom-purple text-[#FFFFFF]  ">
          {services_main_title}
        </h2>

        {/*services picture*/}
        <div className="flex flex-col pr-3 text-small  text-white  items-center justify-center  mb-8 lg:mb-0 gap-6 lg:flex-row w-full  lg:gap-6">
          <Link
            href="/download"
            className="w-full max-w-[262px] lg:max-w-1/3  lg:w-[28%] xl:w-[23%]  border h-10 cursor-pointer rounded flex justify-center items-center"
          >
            <Image
              src="/images/landing/mobileApp.webp"
              alt="mobile icon"
              className="mr-2"
              width={25}
              height={25}
            />
            <p>{mobile_app}</p>
          </Link>
          <Link
            className="w-full max-w-[262px] lg:max-w-1/3  lg:w-[28%] xl:w-[23%] border h-10 cursor-pointer rounded flex justify-center items-center"
            href="/chat"
          >
            <Image
              src="/images/landing/desktopApp.webp"
              alt="desktop icon"
              className=" mr-2 "
              width={25}
              height={25}
            />
            <p>{Website_app}</p>
          </Link>
          <Link
            href="/download"
            className="w-full max-w-[262px] lg:max-w-1/3 lg:w-[28%] xl:w-[23%] border h-10 rounded cursor-pointer flex justify-center items-center"
          >
            <Image
              src="/images/landing/extension.webp"
              alt="extension icon"
              className=" mr-2"
              width={25}
              height={25}
            />
            <p>{Extention}</p>
          </Link>
        </div>
      </div>
    </>
  );
}
