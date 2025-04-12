"use client";

import { useRef } from "react";

import AppIcon from "@/components/shared/AppIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { type LandingFaq } from "@/services/static-pages/landing";

interface Props {
  faqs: LandingFaq[];
}

const FaqSection = ({ faqs }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(elementRef, {
    threshold: 0.1,
  });
  const {
    components: {
      landing: { FAQ },
    },
  } = useGetDictionary();
  return (
    <div ref={elementRef} className=" relative z-20   w-full backdrop-blur-sm">
      <div
        className={cn(
          " flex h-full translate-x-[10%] flex-col opacity-0  lg:gap-0 ",
          isIntersecting &&
            "translate-x-0 opacity-100 transition-all duration-700",
        )}
      >
        <div className="flex w-full flex-col gap-4 lg:gap-8">
          <Accordion type="multiple">
            {faqs.map((faq, index) => {
              return (
                <AccordionItem
                  className=" my-5 border-none lg:my-10 text-transparent"
                  key={faq.title}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="flex h-12 w-full flex-row items-center justify-between rounded-lg border  border-white bg-glass-dark text-left lg:h-[60.6px]">
                    <p className="mx-5 w-[90%] truncate text-label-light md:text-white lg:text-xlarge lg:font-[400]  lg:leading-relaxed ">
                      {faq.title}
                    </p>
                    <AppIcon
                      icon="gala:add"
                      width={22}
                      className="ml-auto text-label-light md:text-white"
                    />
                  </AccordionTrigger>
                  <AccordionContent className="mx-5 mt-8    h-auto w-full rounded-lg">
                    <p className="text-label-light md:text-white w-[98%] text-left lg:text-large lg:font-[400] lg:leading-relaxed">
                      {faq.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
