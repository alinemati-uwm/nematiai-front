import { type Metadata } from "next";

import dynamic from "next/dynamic";

import NonProtectedLoading from "@/components/shared/non-protected-loading";
import { type LangParams } from "@/services/types";

export const metadata: Metadata = {
  title: "Form",
  robots: {
    index: false,
    follow: false,
  },
};
const Form = dynamic(() => import("@/components/pages/forms"), {
  loading: () => <NonProtectedLoading />,
});

function FormPage({ params }: LangParams) {
  return <Form />;
}
export default FormPage;
