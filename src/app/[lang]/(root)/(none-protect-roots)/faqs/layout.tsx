import React from "react";

import Navbar from "@/components/pages/Landing/layout/Navbar";

// import { getServerSession } from "next-auth";
// import { authConfig } from "@/config/auth";
import "@/styles/auth-layout.css";

interface IProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
  return (
    <div className="relative flex h-auto lg:h-full w-full  flex-col overflow-y-scroll items-center justify-center bg-[#07081C]">
      <Navbar />

      <div className="w-full h-full ">{children}</div>
      <div className="w-full px-4 lg:px-0"></div>
    </div>
  );
}
