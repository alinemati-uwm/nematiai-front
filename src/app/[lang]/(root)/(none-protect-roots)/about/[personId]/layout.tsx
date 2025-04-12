import React from "react";

import Navbar from "@/components/pages/Landing/layout/Navbar";
import type { ParamsType } from "@/services/types";

// import { getServerSession } from "next-auth";
// import { authConfig } from "@/config/auth";
import "@/styles/auth-layout.css";

interface IProps {
  children: React.ReactNode;
  params: ParamsType;
}

export default async function Layout({ children }: IProps) {
  // this function get info from Google and if session was valid (user signed in) redirect users to dashboard
  // TODO: session here
  // const session = await getServerSession(authConfig);
  // if (session) return redirect("/dashboard");

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#07081C] max-w-[1920px] mx-auto">
      <Navbar />
      <div className="w-full mt-16">{children}</div>
      {/*<Footer params={params} />*/}
    </div>
  );
}
