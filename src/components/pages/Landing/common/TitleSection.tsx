import type { JSX } from "react";

import { cn } from "@/lib/utils";

interface T {
  title?: string;
  titlePrimary?: string;
  subTitle?: string;
  br?: boolean;
  classNames?: string;
  customTrue?: boolean;
  customize?: JSX.Element;
}

const TitleSection = ({
  customTrue,
  customize,
  title,
  titlePrimary,
  subTitle,
  br,
  classNames,
}: T) => {
  if (!customTrue) {
    return (
      <div
        className={cn(
          " w-full items-center justify-center font-[600] flex flex-col gap-3 xl:gap-6",
          classNames,
        )}
      >
        <h2 className=" text-large lg:text-5xl text-shadow-custom-purple text-[#FFFFFF]">
          {title}
          {br && <br />}
          <span className="text-landing-primary"> {titlePrimary}</span>
        </h2>
        <div className=" text-center">
          <span className=" text-base leading-tight md:text-large lg:leading-normal font-[400] text-landing-muted">
            {subTitle}
          </span>
        </div>
      </div>
    );
  } else {
    return <div className={cn(classNames)}>{customize}</div>;
  }
};

export default TitleSection;
