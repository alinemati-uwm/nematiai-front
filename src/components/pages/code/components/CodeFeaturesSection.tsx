"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";
import { features } from "@/constants/code";
import { useGetDictionary } from "@/hooks";

import useCodeFeatures from "../hooks/useCodeFeatures";

/**
 * list of AI code page feature
 * based on this list, the feature section will be rendered
 * @type {Array<{id: number, key: string, titleI18Key: string, descriptionI18Key: string}>} feature item
 * by clicking on each item, the page will be redirected to the selected feature by setting the search params
 * @constructor
 */
export function CodeFeaturesSection() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();
  const { currentFeature, setFeature } = useCodeFeatures();
  const activeTheme = useUiStore.use.activeTheme();
  const { isLessThan } = useBreakpoint();

  return (
    <section className="relative col-span-12 h-fit overflow-y-auto md:col-span-3 md:h-full md:max-h-full">
      <div className="grid grid-cols-3 text-center md:text-left md:flex md:flex-col gap-4 gap-y-5">
        {features.map(item => (
          <div
            className={cn(
              "col cursor-pointer rounded bg-holder-lighter border px-3 py-4 transition-all duration-300 xl:px-4",
              currentFeature === item.key &&
                "border-primary-lighter shadow-lg bg-primary-lighter", // highlight the selected feature
            )}
            key={item.id}
            onClick={() => setFeature(item.key)}
          >
            {isLessThan("md") ? (
              <div className="text-small">
                {codeDictionary[item.titleI18Key]}
              </div>
            ) : (
              <>
                <h2 className="text-base lg:text-base font-medium mb-1">
                  {codeDictionary[item.titleI18Key]}
                </h2>
                <p className="text-small font-normal text-label-light lg:text-smallm">
                  {codeDictionary[item.descriptionI18Key]}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
