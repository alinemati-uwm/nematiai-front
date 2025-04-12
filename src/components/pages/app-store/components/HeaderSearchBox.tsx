"use client";

import useShowElementOnScroll from "@/components/pages/app-store/hooks/useShowElementOnScroll";
import AppIcon from "@/components/shared/AppIcon";
import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";

/**
 * used in app store header
 * default is hidden and when search box main not in view it will be visible
 * @constructor
 */
export function HeaderSearchBox() {
  const {
    common: { search },
  } = useGetDictionary();

  // * fore show search box when main not in view
  const searchRef = useShowElementOnScroll("app-store-main");

  return (
    <div
      className="fit relative ms-auto opacity-0 transition-all duration-300"
      ref={searchRef}
    >
      {/*
       * muted background input
       */}
      <Input
        type="search"
        className="w-60 bg-input ps-8  font-light"
        placeholder={search}
      />
      {/*
       * search icon
       */}
      <AppIcon
        width={12}
        className="absolute start-2 top-1/2 -translate-y-1/2"
        icon="fe:search"
      />
    </div>
  );
}
