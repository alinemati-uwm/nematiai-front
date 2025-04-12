import Image from "next/image";

import { openAiLogo } from "@/constants/Landing";

export default function TitleAndModels({ gpts_title }: { gpts_title: string }) {
  return (
    <>
      <h2 className="font-[600] text-2xl lg:text-5xl text-shadow-custom-purple truncate   text-[#FFFFFF] z-10">
        {gpts_title}
      </h2>
      <div className=" flex lg:gap-20 flex-wrap gap-6 w-full items-center  justify-center md:gap-4">
        {openAiLogo.map(logo => (
          <div
            key={logo.id}
            className="lg:text text-small text-label-light flex items-center  justify-center"
          >
            <Image
              src={`/images/landing/${logo.image}`}
              alt={`${logo.nameAI} icon`}
              width={30}
              height={30}
              className="mr-2 lg:w-8 lg:h-8"
            />
            <span className="lg:text text-small text-muted ">
              {logo.nameAI}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
