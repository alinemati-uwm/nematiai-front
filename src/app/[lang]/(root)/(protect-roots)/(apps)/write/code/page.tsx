import dynamic from "next/dynamic";

import CodeLoading from "@/app/[lang]/(root)/(protect-roots)/(apps)/write/code/loading";

const CodePage = dynamic(() => import("@/components/pages/code"), {
  loading: () => <CodeLoading />,
});

export default function Code() {
  return <CodePage />;
}
