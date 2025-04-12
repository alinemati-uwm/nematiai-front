"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import DropdownMenuLanding from "@/components/pages/Landing/common/DropdownMenuLanding";
import { NavigationMenuDropDown } from "@/components/pages/Landing/common/navbarDropDown";
import { Landing_btn } from "@/components/ui/landing-btn";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { APP_ROUTES } from "@/refactor_lib/constants";
import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

interface Props {
  logPage?: boolean;
}

const Navbar = ({ logPage }: Props) => {
  const [isExist, setIsExist] = useState<any>();
  useEffect(() => {
    const checkToken = () => {
      const isExists = LocalStorageManger.getUserSession();
      const token = isExists?.access_token;
      setIsExist(token);
    };
    checkToken();
  }, []);
  const {
    common: { start_free, brand_name },
    navbar: { lunch_app },
  } = useGetDictionary();

  // const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className=" fixed top-0   z-[999]  flex h-16 w-full  flex-row items-center justify-center bg-glass-dark backdrop-blur-3xl ">
      <div className="mr-4 flex  h-full w-full  flex-row items-center lg:mx-8 xl:mx-16 ">
        <Link
          href="/"
          className="mx-2 flex flex-row items-center  gap-x-2 lg:mx-0  h-full w-[180px]    relative top-[-2]  "
        >
          <Image
            src="/images/common/logo.svg"
            alt="nerdStudio"
            height={40}
            width={40}
            priority
          />
          <p className="text-gradiant font-extrabold text-xlarge">
            {brand_name}
          </p>
        </Link>
        <div className="mx-5 ml-3 hidden h-full lg:flex   ">
          <NavigationMenuDropDown />
        </div>
        {!logPage && (
          <Link
            href={isExist ? APP_ROUTES.chatApp : APP_ROUTES.login}
            className="ml-auto"
            aria-label="Go to the login page"
          >
            <Landing_btn
              variant="secondary"
              size="lg"
              className="h-9 hidden lg:flex"
            >
              {isExist ? lunch_app : start_free}
            </Landing_btn>
          </Link>
        )}
        <div className={cn(logPage && " ml-auto")}>
          <div className="mx-2 w-full lg:hidden">
            <DropdownMenuLanding />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
