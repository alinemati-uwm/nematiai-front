import React from "react";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/pages/Landing/layout/Navbar";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-tr from-[#4c3488] text-white w-screen h-screen">
      <Navbar />
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <p className=" text-5xl pt-20">Sorry , Page Not Found !</p>
        <Image
          src="/images/not-found/404-error-animation.png"
          width={450}
          height={450}
          alt="404 Image"
          quality={100}
        />
        <Link
          href="/"
          className="w-[170px] h-12 bg-primary flex justify-center items-center text-large rounded hover:bg-primary-dark duration-300"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
