import dynamic from "next/dynamic";

import type { Locale } from "@/../i18n.config";
import AppStoreLoading from "@/app/[lang]/(root)/(protect-roots)/app-store/loading";

// @ts-ignore
const AppStorePage = dynamic(() => import("@/components/pages/app-store"), {
  loading: () => <AppStoreLoading />,
});

export default async function AppStore({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <AppStorePage lang={lang} />;
}
