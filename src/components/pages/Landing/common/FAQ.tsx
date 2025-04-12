"use client";

import { useRef } from "react";

import TitleSection from "@/components/pages/Landing/common/TitleSection";
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

const FAQ = ({ faqs }: Props) => {
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
    <div
      ref={elementRef}
      className=" relative z-20  mt-12 w-full backdrop-blur-sm"
    >
      <div
        className={cn(
          "mx-8 flex h-full translate-x-[10%] flex-col opacity-0 lg:mx-[160px] lg:gap-0 ",
          isIntersecting &&
            "translate-x-0 opacity-100 transition-all duration-700",
        )}
      >
        <TitleSection title={FAQ} />
        <div className="flex w-full flex-col gap-4 lg:gap-8">
          <Accordion type="multiple">
            {faqs.map((faq, index) => {
              return (
                <AccordionItem
                  className=" my-5 border-none lg:my-10 text-transparent"
                  key={faq.title}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="flex h-12 w-full flex-row items-center justify-between rounded-lg border  border-white bg-glass-dark text-left lg:h-[81.6px]">
                    <p className="mx-5 w-[90%] truncate text-label-light md:text-white md:text-large lg:font-[400]  lg:leading-relaxed ">
                      {faq.title}
                    </p>
                    <AppIcon
                      icon="formkit:add"
                      width={20}
                      className="ml-auto text-label-light md:text-white "
                    />
                  </AccordionTrigger>
                  <AccordionContent className="mx-5 mt-8   h-auto w-full rounded-lg">
                    <p className="md:text-white text-label-light lg:text-large lg:font-[400] lg:leading-relaxed">
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

export default FAQ;
