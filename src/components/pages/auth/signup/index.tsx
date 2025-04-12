import dynamic from "next/dynamic";

import HomeLoading from "@/app/[lang]/(root)/(protect-roots)/loading";
import type { ParamsType } from "@/services/types";

const Form = dynamic(() => import("./form"), {
  loading: () => <HomeLoading />,
});

interface IProps {
  params: ParamsType;
  searchParams: { token: string; email: string };
}

export default function SignUpPage({ params, searchParams }: IProps) {
  return (
    <div className="flex h-full w-full flex-col items-center ">
      {/*<Navbar logPage={true} />*/}

      <Form searchParams={searchParams} />
    </div>
  );
}
