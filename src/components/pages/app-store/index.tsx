"use client";

import SpacesHeader from "@/components/layout/header/SpacesHeader";
import { Categories } from "@/components/shared";
import { BannerWithSearch } from "@/components/shared/BannerWithSearch";
import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";
import { AppsList, HeaderSearchBox } from "./components";

const categories = [
  "Recommended",
  "Writing",
  "Chat",
  "Image",
  "Video",
  "Audio",
  "Social",
  "Programing",
  "Other",
];
export default async function AppStorePage({ lang }: { lang: Locale }) {
  const {
    page: {
      store: { header_title },
    },
  } = await getDictionary(lang);

  return (
    <div className="w-full">
      {/*
          header with search box on right shown when hero section search box is not visible
      */}
      <SpacesHeader>
        <h1 className="ms-2 text-large font-semibold">{header_title}</h1>
        <HeaderSearchBox />
      </SpacesHeader>
      <div
        id="app-store-main"
        className="col max-h-page h-[var(--main-height)] w-full gap-4 overflow-y-auto bg-holder-lighter"
      >
        <BannerWithSearch onChangeText={() => {}} />
        <div className="col gap-4 p-2 md:p-4 lg:gap-6 lg:p-6">
          <Categories name="select-apps-category" categories={categories} />
          <AppsList />
        </div>
      </div>
    </div>
  );
}
