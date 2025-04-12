import { memo, useEffect, useState } from "react";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import useCheckSidePanelOpen from "@/components/layout/siedebar/menues/hooks/useCheckSidePanelOpen";
import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";
import { type appMenuesType } from "@/hooks/category/model";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

interface IProps {
  item: appMenuesType;
}

/**
 * menu item left icon render image or icon from React icons
 * @param icon
 * @param isActive
 */

const SidePanelItem = ({
  item: { i18Key, icon, activeIcon, items, route },
}: IProps) => {
  const { breakpoint } = useBreakpoint();
  const pathname = usePathname();
  const { lang } = useParams();
  const isActive = pathname === `/${lang}${route === "/" ? "" : route}`;
  const isOpenSidePanel = useCheckSidePanelOpen();
  const [menuToggle, setMenuToggle] = useState(false);
  const {
    components: { menu },
  } = useGetDictionary();

  useEffect(() => {
    !isOpenSidePanel && setMenuToggle(false);
  }, [isOpenSidePanel]);

  return (
    <div className="flex flex-col px-2">
      <div
        className={`flex flex-row items-center ${isOpenSidePanel ? "pr-3 justify-between " : "justify-center"} rounded relative ${isActive ? "bg-primary-lighter" : ""} hover:bg-muted-dark transition`}
      >
        {isActive && isOpenSidePanel ? (
          <div className="bg-primary rounded-r-md absolute left-0 top-1/2 bottom-0 w-1 h-[70%] transform -translate-y-1/2"></div>
        ) : null}
        <Link
          href={`/${lang}${route}`}
          className={`flex flex-row items-center gap-x-2 whitespace-nowrap w-full h-[40px] ${isOpenSidePanel ? "pl-4" : "justify-center"}`}
        >
          <AppIcon
            className={cn(` ${isActive && "text-primary"}`)}
            width={20}
            height={20}
            icon={isActive ? activeIcon! : icon}
          />
          {isOpenSidePanel ? (
            <AppTypo variant="small">{menu[i18Key] ?? ""}</AppTypo>
          ) : null}
        </Link>
        {items.length && isOpenSidePanel ? (
          <AppIcon
            width={18}
            height={18}
            icon="mingcute:down-line"
            className="cursor-pointer transition "
            onClick={() => setMenuToggle(prev => !prev)}
            style={{ transform: menuToggle ? "rotate(180deg)" : "" }}
          />
        ) : null}
      </div>
      {items.length && menuToggle ? (
        <div className="flex flex-col">
          {items.map((el, key) => (
            <Link
              key={key}
              href={el.route}
              className="pl-10 pr-3 rounded py-2 transition hover:bg-muted-dark"
            >
              <AppTypo variant="small">{menu[el.i18Key] ?? ""}</AppTypo>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default memo(SidePanelItem);
