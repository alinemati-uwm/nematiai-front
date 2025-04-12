"use client";

import React from "react";

import dynamic from "next/dynamic";

import Footer from "@/app/[lang]/(root)/(none-protect-roots)/features/components/footer/page";

import Navbar from "../Landing/layout/Navbar";
import styles from "./style.module.css";

const MarkdownRenderer = dynamic(
  () => import("@/components/shared/markdown-rendered/MarkdownRendered"),
  {
    ssr: false,
  },
);

interface IProps {
  content: string;
}

function TermsPrivacyPage({ content }: IProps) {
  return (
    <div className="relative mx-auto h-full overflow-x-hidden  w-full bg-gradient-to-t from-[#3c1475a3] z-10">
      <Navbar />
      <main
        className={`min-h-[60vh] py-[100px] flex justify-center ${styles.markdown}`}
      >
        <div className="flex flex-col text-gray-100 w-[95%] max-w-[900px] leading-6">
          <MarkdownRenderer
            content={content}
            wrapperClassName="!prose-invert"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TermsPrivacyPage;
