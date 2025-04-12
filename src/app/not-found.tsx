"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Navbar from "@/components/pages/Landing/layout/Navbar";

import "@/config/globals.css";

export default function NotFound() {
  const router = useRouter();
  return (
    <html
      lang="en"
      // @ts-ignore
      foxified=""
    >
      <body>
        <div className="bg-gradient-to-tr from-[#4c3488] text-white w-screen h-screen">
          <Navbar />
          <div className="w-full h-full flex flex-col overflow-y-auto justify-center items-center ">
            <p className=" text-5xl pt-20">Sorry , Page Not Found !</p>
            <Image
              src="/images/not-found/404-error-animation.png"
              width={450}
              height={450}
              alt="404 Image"
              quality={100}
            />
            <button
              onClick={() => router.back()}
              className="w-[170px] h-12 bg-primary flex justify-center items-center text-large rounded hover:bg-primary-dark duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
