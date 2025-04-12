"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { type appMenuesType } from "@/hooks/category/model";
import useAppCategory from "@/hooks/category/useAppCategory";
import { useGetDictionary } from "@/hooks";

export default function Title() {
  const {
    page: {
      chat: { welcome_description, welcome_title },
    },
  } = useGetDictionary();

  return (
    <div className="flex mx-auto max-w-[100%] lg:max-w-[760px] flex-col gap-6 items-center justify-center ">
      <div className="flex items-center justify-center gap-2">
        <AppTypo type="h3" variantMobileSize="headingM" variant="headingXL">
          {welcome_title}
        </AppTypo>
      </div>
      <span className="hidden md:flex">
        <AppTypo type="p" variant="small" color="secondary">
          {welcome_description}
        </AppTypo>
      </span>
    </div>
  );
}

export function ShortcutLinks() {
  const { getPages } = useAppCategory();

  const list = getPages([
    "document",
    "grammar",
    "rewrite",
    "image_editor",
    "image_to_image",
  ]);
  const { lang } = useParams();
  const {
    components: { menu },
  } = useGetDictionary();

  const renderAppItem = (info: appMenuesType["items"][number]) => {
    return (
      <div key={info.i18Key} className="h-full ">
        <Link href={`/${lang}${info.route}`}>
          <div className="border border-holder hover:bg-holder hover:border-holder-dark cursor-pointer gap-2 p-2 flex-row w-full h-full rounded-lg flex justify-center items-center">
            <div
              className={`${info.classname} w-6 h-6 cursor-pointer flex justify-center items-center rounded-full`}
            >
              <AppIcon icon={info.icon || ""} fontSize="16" />
            </div>
            <AppTypo className="whitespace-nowrap cursor-pointer" type="label">
              {menu[info.i18Key]}
            </AppTypo>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-row h-9 gap-3 justify-center items-center  flex-wrap ">
      {list.map(renderAppItem)}
    </div>
  );
}
