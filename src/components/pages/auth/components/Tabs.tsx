"use client";

import React from "react";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import AppTypo from "@/components/ui/AppTypo";

function LoginPageTabs() {
  const pathname = usePathname();
  const { lang } = useParams();

  const items = [
    {
      caption: "Sign in",
      icon: "material-symbols:login",
      link: `/${lang ? lang + "/" : ""}login`,
    },
    {
      caption: "Sign up",
      icon: "ic:outline-person-add",
      link: `/${lang ? lang + "/" : ""}signup`,
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-row justify-center items-center bg-muted mt-auto p-1 rounded-full">
        {items.map((el, key) => (
          <Link
            href={el.link}
            key={key}
            className={`flex flex-row items-center gap-x-1 rounded-full py-1 px-4 ${el.link === pathname ? "bg-muted-lighter" : ""}`}
          >
            <AppIcon icon={el.icon} width={20} />
            <AppTypo>{el.caption}</AppTypo>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LoginPageTabs;
