import { type Metadata } from "next";

import dynamic from "next/dynamic";

import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";

export const metadata: Metadata = {
  title: "Reset Password",
};
const NewPassPage = dynamic(
  () => import("@/components/pages//forget-pass/NewPassPage"),
  {
    loading: () => <HomeLoading />,
  },
);

function Page({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  return <NewPassPage token={searchParams.token} email={searchParams.email} />;
}

export default Page;
