import Image from "next/image";

import { cn } from "@/lib/utils";

interface Props {
  secondStepRef: any;
  secondStepIsIntersection: boolean;
  services_second_step_1_5: string;
  services_second_step_2_5: string;
  explor_custom_lib: string;
}
export default function SecondServiceStep({
  secondStepRef,
  secondStepIsIntersection,
  services_second_step_1_5,
  services_second_step_2_5,
  explor_custom_lib,
}: Props) {
  return (
    <>
      <div className={cn("w-full flex flex-col ")}>
        <div className="w-full flex flex-row gap-6 lg:gap-10 my-5 lg:my-0  h-[200px]  lg:h-[466px]  ">
          <div
            ref={secondStepRef}
            className={cn(
              "relative lg:ml-4 flex items-center justify-center  h-0 w-2   bg-custom-gradient",
              secondStepIsIntersection &&
                " transition-all h-[200px]  lg:h-[450px] duration-700",
            )}
          ></div>
          <div className="w-full text-2xl   lg:text-5xl flex flex-col my-auto text-shadow-custom-purple">
            <span className="font-[600]  text-shadow-landing text-[#FFFFFF]">
              {" "}
              {services_second_step_1_5}
            </span>
            <span className="font-[600]  text-shadow-landing  text-landing-primary">
              {" "}
              {services_second_step_2_5}
            </span>
            <span className="text-landing-muted text-base  md:text-large mt-3">
              {explor_custom_lib}
            </span>
          </div>
        </div>
        <div className=" max-w-[1490px] max-h-[699px] translate-x-0 opacity-100 transition-all duration-700">
          <Image
            src="/images/landing/custom_prompt_page.png"
            className="w-full h-full max-h-[690px] rounded-lg hidden sm:flex "
            alt="screenshot of desktop custom prompt library section"
            width={690}
            height={300}
            quality={100}
            layout="responsive"
          />

          <div className="flex  w-full h-[734px] sm:hidden">
            <Image
              src="/images/landing/custom_prompt_mobile.jpg"
              width={690}
              height={200}
              className="h-full w-[399px]  mr-auto rounded"
              alt="screenshot of mobile custom prompt library section"
            />
          </div>
        </div>
      </div>
    </>
  );
}
