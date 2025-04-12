"use client";

import React, { useRef } from "react";

import { useResizeObserver } from "usehooks-ts";

import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCustomSearchParams } from "@/hooks";

import { MinimalButton } from "./MinimalButtton";

interface IProps extends React.ComponentPropsWithoutRef<"nav"> {
  name: string;
  categories: string[];
  onChangeTabValue?: (v: string) => void;
  defaultValue?: string;
  value?: string;
  setShowAdvance?: (v: boolean) => void;
  classNameBtn?: string;
  className?: string;
}

/**
 * list of apps categories
 * used in app store to user sort apps by category
 * if items is get space more than available width of container, will show more button
 * @constructor
 */
export function Categories({
  name,
  classNameBtn = "",
  categories,
  onChangeTabValue,
  className,
  defaultValue,
  setShowAdvance,
  value,
  ...navProps
}: IProps) {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  // get container ref for calculate width
  const ref = useRef<HTMLDivElement>(null);
  //calculate width of container
  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });
  /**
   * average tab size is 110px
   * calculate max item that can be shown in container by container width / average tab size
   */
  const maxItem = Math.floor(width / 130);

  function handleSelect(v: string) {
    if (onChangeTabValue) {
      setShowAdvance?.(false);
      onChangeTabValue(v);
    } else {
      setSearchParams(name, v);
    }
  }

  return (
    <nav className={cn("w-full max-w-full", className)} ref={ref} {...navProps}>
      <Tabs
        className="h-full w-full"
        onValueChange={handleSelect}
        value={value ? value : searchParams.get(name) || defaultValue || ""}
      >
        <TabsList className="row w-full justify-start gap-2 bg-transparent p-0">
          {categories.slice(0, maxItem).map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-none w-auto border-b-2 border-transparent bg-transparent py-2 px-3 text-label hover:text-primary/80 data-[state=active]:border-b-3
							data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none  "
            >
              {category}
            </TabsTrigger>
          ))}
          {/*
           * if items is get space more than available width of container, will show more button
           * a hover card will show when hover on more button and show rest of categories vertically list
           */}
          <RenderIf isTrue={maxItem < categories.length}>
            <HoverCard openDelay={10} closeDelay={50}>
              <HoverCardTrigger>
                <MinimalButton icon="ri:more-fill"></MinimalButton>
              </HoverCardTrigger>
              <HoverCardContent
                side="bottom"
                className="col max-w-[190px] p-1 mt-4"
              >
                {categories.slice(maxItem).map(category => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="row h-fit w-full justify-start px-2.5 py-2 capitalize text-label/70 hover:bg-holder-dark focus-visible:ring-offset-0"
                    onClick={() => handleSelect(category)}
                  >
                    {category}
                  </Button>
                ))}
              </HoverCardContent>
            </HoverCard>
          </RenderIf>
        </TabsList>
      </Tabs>
    </nav>
  );
}
