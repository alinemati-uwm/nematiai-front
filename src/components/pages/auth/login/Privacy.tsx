"use client";

import React from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import AppTypo from "@/components/ui/AppTypo";
import { useGetDictionary } from "@/hooks";

function PrivacyLogin() {
  const { lang } = useParams();
  const {
    page: { login },
    common: { and },
  } = useGetDictionary();

  return (
    <AppTypo variant="small" className="text-center">
      {login.by_sign_up}{" "}
      <Link
        href={`/${lang}/terms`}
        className="text-primary-light font-semibold"
      >
        {login.terms_and_condition}
      </Link>{" "}
      {and}{" "}
      <Link
        href={`/${lang}/privacy`}
        className="text-primary-light font-semibold"
      >
        {login.privacy_policy}
      </Link>
    </AppTypo>
  );
}

export default PrivacyLogin;
