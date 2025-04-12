import React from "react";

import PageGenerateForm from "@/components/page-generate/form";
import PageGenerateHero from "@/components/page-generate/hero";
import PageGenerateTabs from "@/components/page-generate/tabs";
import { cn } from "@/lib/utils";

type Div = React.ComponentPropsWithoutRef<"div">;
interface IProps extends Div {}

function PageGenerate({ children, className, ...otherProps }: IProps) {
  return (
    <div
      className={cn(
        "flex w-full py-2.5 px-2 md:px-4 lg:px-6  min-h-full  justify-center  bg-holder-lighter text-center",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}

PageGenerate.Main = ({ children, className, ...otherProps }: Div) => {
  return (
    <div
      className={cn(
        "col w-full max-w-3xl items-center text-center  gap-4",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};

PageGenerate.Hero = PageGenerateHero;
PageGenerate.Tabs = PageGenerateTabs;
PageGenerate.Form = PageGenerateForm;

export default PageGenerate;
