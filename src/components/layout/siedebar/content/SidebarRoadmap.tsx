import React from "react";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import useAppCategory from "@/hooks/category/useAppCategory";

function SidebarRoadmap() {
  const pathname = usePathname();
  const { lang } = useParams();
  const { flattenMenu } = useAppCategory();

  const findMenues = () => {
    const findeRoute = flattenMenu.find(
      el => el.route === pathname.replace("/" + lang?.toString(), ""),
    )?.route;

    return findeRoute?.split("/").filter(el => el.length > 1);
  };

  const exactRoute: string[] = [];
  const findRoute = findMenues()?.map(el => {
    exactRoute.push(el);
  });

  return findMenues()?.length ? (
    <div className="flex flex-row gap-x-1 items-center h-header sticky top-0 bg-holder-lighter z-10 ">
      <Link href={`/${exactRoute[0]}`}>
        <AppIcon
          icon="mdi:arrow-left"
          width={16}
          className="mr-1 cursor-pointer"
        />
      </Link>

      {findMenues()?.map((el, key) => (
        <div key={key} className="flex flex-row gap-x-1">
          {key > 0 ? <div className="">/</div> : null}
          <Link
            href={`/${findMenues()?.[key - 1] ? `${findMenues()?.[key - 1]}/` : ""}${el}`}
          >
            <AppTypo
              variant="headingXS"
              className="capitalize text-nowrap"
              color={key === 0 ? "secondary" : "primary"}
            >
              {el}
            </AppTypo>
          </Link>
        </div>
      ))}
    </div>
  ) : null;
}

export default SidebarRoadmap;
