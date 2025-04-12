import Image from "next/image";
import Link from "next/link";

import { steps } from "@/constants/Landing";

export default function Boxes() {
  return (
    <>
      {steps.map((item, index) => (
        <div
          key={item.id}
          className="z-30 flex w-full flex-col bg-glass-dark backdrop-blur-sm border rounded-lg  lg:w-[300px] xl:w-[340px]  "
        >
          <div className="flex   flex-col mx-4 my-4  lg:mx-8 lg:my-4">
            {/*Card Steps*/}
            <div className=" flex w-full   flex-row ">
              <div className="flex w-full  flex-row justify-between  lg:justify-start   relative ">
                <div className="flex items-center ">
                  <Image
                    src={`/images/landing/${item.img}`}
                    width={90}
                    height={90}
                    alt={`${item.title} icon`}
                    className=""
                    quality={100}
                  />
                  <span className="whitespace-nowrap  text-label-light text-large lg:text-large lg:leading-normal lg:font-[400] ">
                    {item.title}
                  </span>
                </div>

                <Image
                  src={`/images/landing/${item.number}`}
                  alt={`${item.number}st box number`}
                  width={90}
                  height={90}
                  className="opacity-20 ml-auto lg:absolute lg:-right-10"
                />
              </div>
            </div>

            <div>
              <p className="text-white text-base font-[400] leading-tight lg:text-large lg:leading-normal    ">
                {item.sub}
                {index !== 2 && (
                  <Link className="text-landing-primary" href={`${item.link}`}>
                    {(index === 0 && "here.") || (index === 1 && "Extention.")}
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
