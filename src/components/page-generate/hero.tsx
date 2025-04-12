import React, { type FC } from "react";

import AppTypo from "@/components/ui/AppTypo";
import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

interface IProps {
  title: string;
  description: string;
  titleClassName?: string;
}

const GenerateFormHero: FC<IProps> = ({
  description,
  title,
  titleClassName,
}) => {
  return (
    <>
      <div className="relative">
        <span
          className={cn(
            "text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-success to-label-dark",
            titleClassName,
          )}
        >
          {title}
        </span>
        <div className={`bg-holder-lighter ${styles.animate}`}></div>
      </div>
      <AppTypo>{description}</AppTypo>
    </>
  );
};

export default GenerateFormHero;
