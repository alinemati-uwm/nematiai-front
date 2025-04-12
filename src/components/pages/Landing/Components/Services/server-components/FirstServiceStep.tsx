import Image from "next/image";

import { cn } from "@/lib/utils";

interface Props {
  firstStepRef: any;
  firstStepIsIntersection: boolean;
  services_first_step_1_5: string;
  services_first_step_2_5: string;
  what_is_prompt: string;
}
const FirstServiceStep = ({
  firstStepRef,
  firstStepIsIntersection,
  services_first_step_1_5,
  services_first_step_2_5,
  what_is_prompt,
}: Props) => {
  return (
    <>
      <div className={cn(" flex flex-col ")}>
        <div className="w-full flex flex-row gap-6 mb-4 lg:mb-0 lg:gap-10  lg:min-h-[510px]  ">
          <div
            ref={firstStepRef}
            className={cn(
              "relative lg:ml-4 flex items-center justify-center  h-0 w-2   bg-custom-gradient",
              firstStepIsIntersection &&
                " transition-all h-[230px] lg:h-[450px] duration-700",
            )}
          >
            <div className="absolute top-0 w-5 h-5 rounded-full bg-landing-primary shadow-2xl"></div>
          </div>
          <div className=" text-2xl w-[90%] lg:text-5xl flex flex-col my-auto text-shadow-custom-purple">
            <span className="font-[600]  text-shadow-landing text-[#FFFFFF]">
              {services_first_step_1_5}{" "}
            </span>
            <span className="font-[600]  text-shadow-landing  text-landing-primary">
              {" "}
              {services_first_step_2_5}
            </span>
            <span className="text-landing-muted text-base md:text-large  mt-3 md:pr-36 text-justify">
              {what_is_prompt}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "max-w-[1490px] max-h-[699px] translate-x-0 opacity-100 transition-all duration-700",
          )}
        >
          <Image
            src="/images/landing/promptLibraryPage.png"
            width={690}
            height={300}
            className="w-full h-[934px]  hidden sm:flex rounded"
            alt="screenshot of desktop prompt library section"
            quality={100}
            layout="responsive"
          />
          <div className="flex  w-full  h-[734px]  sm:hidden ">
            <Image
              src="/images/landing/mobile/prompt_library_mobile.jpg"
              width={390}
              height={300}
              className="h-full w-[369px]  mr-auto rounded  "
              alt="screenshot of mobile prompt library section"
              quality={100}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstServiceStep;
