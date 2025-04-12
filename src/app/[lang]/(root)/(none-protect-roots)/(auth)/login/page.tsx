import { type Metadata } from "next";

import dynamic from "next/dynamic";

import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = dynamic(() => import("@/components/pages/auth/login"), {
  loading: () => <HomeLoading />,
});

export default function Login() {
  return <LoginPage />;
}
