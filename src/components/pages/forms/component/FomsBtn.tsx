"use client";

import { type FieldError, type Merge } from "react-hook-form";

import { Landing_btn } from "@/components/ui/landing-btn";

export default function FormsBtn({
  pending,
  error,
  Send_your_information,
  submited,
}: {
  pending: boolean;
  error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  submited: boolean;
  Send_your_information: string;
}) {
  return (
    <Landing_btn
      type="submit"
      disabled={pending}
      isPending={pending}
      className={` rounded-md border border-landing-primary w-[172.1]  bg-landing-primary px-5 py-2 text-center text-small  text-black ${error ? "md:mt-[10] mt-2 " : "md:mt-[38]"} mt-6 duration-300 hover:!bg-transparent hover:!text-landing-primary`}
    >
      {pending ? null : Send_your_information}
    </Landing_btn>
  );
}
