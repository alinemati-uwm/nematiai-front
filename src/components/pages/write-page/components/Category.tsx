import React from "react";

import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import useAppCategory from "@/hooks/category/useAppCategory";
import { useGetDictionary } from "@/hooks";

function WriteMainCategory() {
  const { getItems } = useAppCategory();
  const {
    components: { menu },
  } = useGetDictionary();

  return (
    <div className="grid grid-cols-3 text-center lg:flex lg:flex-row justify-center gap-2 sm:gap-4">
      {getItems("ai_write")?.length
        ? getItems("ai_write")?.map((el, key) => (
            <Link
              key={key}
              href={el.route}
              className="flex flex-col border border-muted hover:bg-muted-light rounded py-3 sm:px-4 md:px-10 gap-y-2"
            >
              <div className="flex justify-center">
                <div
                  className={`flex justify-center items-center w-6 h-6 rounded-full ${el?.classname ?? ""}`}
                >
                  <AppIcon icon={el?.icon ?? ""} width={16} />
                </div>
              </div>
              <AppTypo>{menu[el.i18Key]}</AppTypo>
            </Link>
          ))
        : null}
    </div>
  );
}

export default WriteMainCategory;
