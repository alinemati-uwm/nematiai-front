import { type Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import LoginSlideshow from "@/components/pages/auth/components/Slideshow";
import LoginPageTabs from "@/components/pages/auth/components/Tabs";
import PrivacyLogin from "@/components/pages/auth/login/Privacy";
import AppIcon from "@/components/shared/AppIcon";
import type { ParamsType } from "@/services/types";

import "@/styles/auth-layout.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

interface IProps {
  children: React.ReactNode;
  params: ParamsType;
}
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
export default async function Layout({ children }: IProps) {
  // this function get info from Google and if session was valid (user signed in) redirect users to dashboard
  // TODO: session here
  // const session = await getServerSession(authConfig);
  // if (session) return redirect("/dashboard");

  return (
    //  @ts-expect-error Server Component
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <LoginSlideshow />
      <div className="flex flex-row h-full p-5 relative z-10">
        <div className="w-[500px] m-auto md:m-0 flex justify-center items-center bg-muted-lighter rounded p-4 h-full relative overflow-auto">
          <Link href="/" className="absolute top-0 left-0 m-4">
            <AppIcon icon="quill:arrow-left" width={20} />
          </Link>
          <div className="w-full md:w-[70%] flex flex-col gap-y-8">
            <Image
              src="/images/common/logo-new.png"
              alt="nemati ai"
              className="m-auto"
              width={164}
              height={50}
            />
            <LoginPageTabs />
            {children}
            <PrivacyLogin />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
