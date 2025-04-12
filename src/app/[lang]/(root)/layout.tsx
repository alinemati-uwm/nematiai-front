import React from "react";

import { Providers } from "@/components/providers";

export default async function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="w-full">{children}</div>
    </Providers>
  );
}
