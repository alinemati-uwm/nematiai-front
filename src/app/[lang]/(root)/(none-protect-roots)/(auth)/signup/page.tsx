import { type Metadata } from "next";

import dynamic from "next/dynamic";

import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import type { ParamsType } from "@/services/types";

export const metadata: Metadata = {
  title: "Signup",
};
const SignUpPage = dynamic(() => import("@/components/pages/auth/signup"), {
  loading: () => <HomeLoading />,
});

interface IProps {
  params: ParamsType;
  searchParams: { token: string; email: string };
}
export default function SignUp({ params, searchParams }: IProps) {
  return <SignUpPage params={params} searchParams={searchParams} />;
}
