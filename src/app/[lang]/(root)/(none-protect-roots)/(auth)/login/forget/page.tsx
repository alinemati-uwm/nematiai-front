import { type Metadata } from "next";

import dynamic from "next/dynamic";

import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";

export const metadata: Metadata = {
  title: "Forgot Password",
};
const ForgetPassPage = dynamic(() => import("@/components/pages/forget-pass"), {
  loading: () => <HomeLoading />,
});

export default function ForgetPass() {
  return <ForgetPassPage />;
}
