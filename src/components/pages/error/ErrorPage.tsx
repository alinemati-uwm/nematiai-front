"use client";

import React from "react";

import Footer from "@/app/[lang]/(root)/(none-protect-roots)/features/components/footer/page";

import Navbar from "../Landing/layout/Navbar";

function ErrorPage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex h-screen text-gray-400 font-semibold text-xl justify-center items-center">
        Cant load this page
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
