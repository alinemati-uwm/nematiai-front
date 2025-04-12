"use client";

import { useCallback, useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { CommentSection } from "@/components/pages/Landing/common/Comment";
import AppIcon from "@/components/shared/AppIcon";
import { Landing_btn } from "@/components/ui/landing-btn";
import useMediaQuery from "@/hooks/useMediaQuery";
import { type LandingComment } from "@/services/static-pages/landing";

import commentsLandingModel from "./model";

interface Props {
  comments?: LandingComment[];
}
const Comments = ({ comments }: Props) => {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const [active, setActive] = useState(
    "bg-primary-lighter border-2 border-primary shadow-xl",
  );
  Autoplay.globalOptions = { delay: 3000 };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
    },
    [Autoplay()],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const scrollPrev = useCallback(() => {
    if (selectedIndex <= 0) {
      setSelectedIndex(comments ? comments.length - 1 : 0);
    } else {
      setSelectedIndex(prev => prev - 1);
    }
    setActive("bg-primary-lighter border-2 border-primary shadow-xl");
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi, selectedIndex]);

  const scrollNext = useCallback(() => {
    if (selectedIndex >= (comments?.length ?? 0) - 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(prev => prev + 1);
    }
    setActive("bg-primary-lighter border-2 border-primary shadow-xl");
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi, selectedIndex]);

  const scrollTo = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      if (emblaApi) {
        setActive("bg-primary-lighter border-2 border-primary shadow-xl");
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );
  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);
      // Return a cleanup function
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  function f(index: number) {
    if (!isMobile) {
      if (selectedIndex === index) {
        return active;
      } else {
        return "border-2 border-muted-dark";
      }
    } else if (isMobile) {
      if (selectedIndex === index) {
        return active;
      } else {
        return "border-2 border-muted-dark";
      }
    }
  }
  const onSelectHandler = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <section className=" padding-x embla flex flex-col z-[10]  " ref={emblaRef}>
      <div className="mb-12 flex z-10 ">
        {commentsLandingModel.items.slice(0, 10).map((comment, index) => (
          <CommentSection
            key={index}
            f={f}
            index={index}
            comment={comment}
            onSelect={onSelectHandler}
          />
        ))}
      </div>
      <div className="z-10 mx-auto lg:mx-0 flex-row items-center justify-between gap-x-5 lg:flex">
        <div className="hidden lg:flex gap-2">
          {[...Array(10)].map((_, index) => (
            <Landing_btn
              key={index}
              size="sm"
              className={` ${index === selectedIndex ? " rounded-full   bg-landing-primary " : " p-2 bg-muted-dark rounded-full"} h-7 w-7  cursor-pointer   transition-all`}
              onClick={() => scrollTo(index)}
              aria-label="select comment manually"
            >
              {/* Dot */}
            </Landing_btn>
          ))}
        </div>

        <div className="flex flex-row  gap-x-5 mb-2">
          <Landing_btn
            variant="rounded"
            size="roundedXl"
            onClick={scrollPrev}
            aria-label="previous button"
          >
            <AppIcon icon="lucide:arrow-left" color="#fff" />
          </Landing_btn>
          <Landing_btn
            variant="rounded"
            size="roundedXl"
            onClick={scrollNext}
            aria-label="next button"
          >
            <AppIcon icon="lucide:arrow-right" color="#fff" />
          </Landing_btn>
        </div>
      </div>
    </section>
  );
};

export default Comments;
