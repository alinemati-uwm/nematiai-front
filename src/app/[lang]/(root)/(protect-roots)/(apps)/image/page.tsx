import dynamic from "next/dynamic";

import ImageLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/image/loading";

const AiImagePage = dynamic(() => import("@/components/pages/image/main"), {
  loading: () => <ImageLoading />,
});

export default function AIImage() {
  return <AiImagePage />;
}
