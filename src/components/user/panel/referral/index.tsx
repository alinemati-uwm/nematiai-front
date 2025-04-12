"use client";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

import ReferralForm from "./Form";
import ReferralHero from "./Hero";

/**
 * component for referral and invite other user
 * used in user-panel dialog
 * @constructor
 */

export default function Referral() {
  const {
    components: {
      user: { panel: dictionary },
    },
  } = useGetDictionary();
  return (
    <div className="mt-4 w-full gap-4 col px-5 h-full">
      <ReferralHero />
      <AppTypo variant="small">{dictionary.referral_description}</AppTypo>
      <ReferralForm />
    </div>
  );
}
