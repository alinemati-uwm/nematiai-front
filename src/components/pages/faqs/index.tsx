"use client";

import React from "react";

import Footer from "@/components/pages/Landing/layout/Footer";
import { useGetDictionary } from "@/hooks";
import { type Landing } from "@/services/static-pages/landing";
import type { LangParams } from "@/services/types";

import MainComp from "./components/MainComp";

function Faqs({ params: { lang }, data }: LangParams & { data?: Landing }) {
  const {
    page: {
      faq: { ask_your_question, frequently_asked_questions },
    },
  } = useGetDictionary();
  return (
    <div className="bg-gradient-to-tr from-[#3C147580] via-[#0f041fb4] to-[#3C147580]">
      <MainComp
        data={data!}
        ask_your_question={ask_your_question}
        frequently_asked_questions={frequently_asked_questions}
      />
      <div className=" overflow-x-clip">
        <Footer />
      </div>
    </div>
  );
}

export default Faqs;
