import { type Metadata } from "next";

import dynamic from "next/dynamic";

import DashboardLoading from "../../../loading";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
const Success = dynamic(() => import("@/components/pages/success-payment"), {
  loading: () => <DashboardLoading />,
});

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return <Success uuid={uuid} />;
}
