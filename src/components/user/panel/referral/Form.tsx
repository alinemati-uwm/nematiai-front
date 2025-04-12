import React from "react";

import CopyButton from "@/components/shared/CopyButton";
import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputVariant } from "@/components/ui/variants";
import { useReferral } from "@/components/user/panel/useReferral";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type { ChildrenProps } from "@/services/types";

const Section = ({ children, title }: ChildrenProps<{ title: string }>) => (
  <div className="flex flex-col gap-label-space ">
    <AppTypo variant="small">{title}:</AppTypo>
    <div className="w-full gap-2 flex">{children}</div>
  </div>
);

function ReferralForm() {
  const {
    components: {
      user: { panel: dictionary },
    },
  } = useGetDictionary();

  const { isPendingEmailReferral, email, setEmail, submitEmailReferral } =
    useReferral();

  const referralCode = "sdskdjksd";
  const referralLink = "https//nerdstudio.ai/";

  return (
    <div className="col gap-4 h-full pb-4">
      <Section title={dictionary.referral_code_title}>
        <div
          className={cn(
            inputVariant({ variant: "input", color: "input" }),
            "row gap-2 max-w-40",
          )}
        >
          {referralCode}
          <CopyButton text={referralCode} />
        </div>
      </Section>

      <Section title={dictionary.referral_link_title}>
        <div className={cn(inputVariant({ variant: "input", color: "input" }))}>
          {referralLink}
        </div>
        <CopyButton
          text={referralLink}
          variant="button"
          title={dictionary.referral_link_button}
          className="w-32"
        />
      </Section>

      <Section title={dictionary.referral_email_title}>
        <Input
          placeholder={dictionary.enter_member_email}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          title={dictionary.invite_member}
          onClick={submitEmailReferral}
          isPending={isPendingEmailReferral}
          variant="default"
          disabled={!email}
          className="w-32"
        >
          {dictionary.invite_member}
        </Button>
      </Section>

      <div className="rounded mt-auto p-2.5 gap-2.5 border border-dashed col border-holder-darker">
        <AppTypo variant="headingXXS">{dictionary.redeem_code_title}</AppTypo>
        <AppTypo variant="small">{dictionary.redeem_code_description}</AppTypo>

        <div className="row gap-2 bg max-w-72">
          <Input placeholder={dictionary.redeem_code_input_placeholder} />
          <Button className="w-10">{dictionary.redeem_code_button}</Button>
        </div>
      </div>
    </div>
  );
}

export default ReferralForm;
