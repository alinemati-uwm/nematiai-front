"use client";

import Footer from "@/components/pages/Landing/layout/Footer";
import { useGetDictionary } from "@/hooks";
import { type LangParams } from "@/services/types";

import Navbar from "../Landing/layout/Navbar";
import MainComp from "./components/mainComp";

function ContactUs({ params: { lang } }: LangParams) {
  const {
    page: {
      contact_us: { Any_question, contact, us },
    },
  } = useGetDictionary();
  return (
    <div
      lang={lang}
      className=" relative mx-auto max-w-[1920px] overflow-x-hidden w-full bg-gradient-to-b from-[#3c1475a3]"
    >
      <Navbar />
      <main className="mt-16 z-10 ">
        <MainComp Any_question={Any_question} contact={contact} us={us} />
        <Footer />
      </main>
    </div>
  );
}

export default ContactUs;
