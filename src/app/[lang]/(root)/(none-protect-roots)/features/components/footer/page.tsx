import React from "react";

import Image from "next/image";
import Link from "next/link";

//TODO:Fixed This component
const Footer = () => {
  return (
    <footer className="  px-4 lg:px-0 bg-transparent  relative z-20 backdrop-blur-sm">
      <div className="flex lg:mx-20   flex-col justify-start gap-8 md:justify-between    text-white md:flex-row ">
        <div className="flex flex-col gap-4 lg:gap-3">
          <div className=" mb-2 flex flex-row items-center justify-start gap-x-1 lg:mb-4.5 ">
            <Image
              width={44}
              height={44}
              src="/images/common/logo.svg"
              alt="brand-openai"
              className="lg:h-10  h-9"
            />
            <span className="text-2xl lg:text-xl font-[800] relative top-0.5  text-gradiant">
              Nerd Studio
            </span>
          </div>
          <div className="flex flex-col text-large justify-start  lg:justify-start">
            <div className="mb-3 flex flex-row items-center gap-x-6">
              <Link href="/download">Download Now</Link>
              <span>License</span>
            </div>
            <div className="flex flex-row items-center gap-x-6 md:justify-start">
              <Link href="/about">
                <span>About</span>
              </Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/news">News</Link>
              <Link href="/forms">Form</Link>
              <Link href="/contact">
                <span className="hidden lg:flex">Contact</span>
              </Link>
              <Link href="/faqs">
                <span className="hidden lg:flex">FAQS</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-large font-[500]">Get The App</span>
          {/*map this here*/}
          <Link href="https://www.apple.com/app-store/" target="blank">
            <Image
              width={135}
              height={40}
              src="/images/footer/appleStore.webp"
              alt="apple Store picture"
              quality={100}
              className=" cursor-pointer"
            />
          </Link>
          <Link href="https://play.google.com/store/games?hl=en" target="blank">
            <Image
              width={135}
              height={40}
              src="/images/footer/playStore.webp"
              alt="apple Store picture"
              quality={100}
              className=" cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
