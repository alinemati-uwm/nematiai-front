"use client";

import type React from "react";
import { useEffect } from "react";

import { useParams, usePathname, useRouter } from "next/navigation";

import LocalStorageManger from "@/refactor_lib/utils/LocalStorageManager";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { lang } = useParams();
  const pathname = usePathname();

  // If landing or login pages redirect when login
  useEffect(() => {
    const langToString = "/" + lang?.toString();
    if (
      LocalStorageManger.getUserSession() &&
      [langToString].includes(pathname)
    )
      router.push(`/${lang}/chat`);
  }, [pathname]);

  return children;
}
