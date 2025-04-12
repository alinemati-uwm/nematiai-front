"use client";

import { useGetDictionary } from "@/hooks";

import FooterApps from "./FooterApps";
import MainComp from "./MainComp";
import Sitemap from "./Sitemap";

//TODO:Fixed This component
const Footer = () => {
  const {
    footer: { get_app, contact, download_now, faqs, form, inc, news, pricing },
    common: { brand_name },
  } = useGetDictionary();
  return (
    <footer className="  py-10  bg-glass-dark px-4 lg:px-0   lg:py-16 relative z-0 backdrop-blur-sm">
      <div className="flex lg:mx-20 flex-col justify-start gap-8 md:justify-between  text-white md:flex-row ">
        <MainComp
          contact={contact}
          download_now={download_now}
          faqs={faqs}
          form={form}
          inc={inc}
          news={news}
          pricing={pricing}
          brand_name={brand_name}
        />
        <FooterApps get_app={get_app} />
        <Sitemap />
      </div>
    </footer>
  );
};

export default Footer;
