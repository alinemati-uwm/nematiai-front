import Image from "next/image";
import Link from "next/link";

import { appSitemap } from "@/constants/sitemap";

interface Prop {
  contact: string;
  download_now: string;
  faqs: string;
  form: string;
  inc: string;
  news: string;
  pricing: string;
  brand_name: string;
}

export default function MainComp({
  contact,
  download_now,
  faqs,
  form,
  inc,
  news,
  pricing,
  brand_name,
}: Prop) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-3 ">
        <Link
          href="/"
          className=" mb-2 flex flex-row items-center justify-start gap-x-2 lg:mb-4.5 "
        >
          <Image
            src="/images/common/logo.svg"
            alt="Nerd Studio logo"
            height={40}
            width={40}
            priority
          />
          <p className="text-gradiant font-extrabold text-xlarge">
            {brand_name}
          </p>
        </Link>
        <div className="flex flex-col text-large justify-start  lg:justify-start">
          <div className="mb-3 flex flex-row items-center gap-x-6">
            <Link href="/download">{download_now}</Link>
          </div>
          <div className="flex flex-row items-center  gap-x-6 md:justify-start flex-wrap gap-y-2">
            {/* <Link href="/about">
								<span>About</span>
							</Link> */}
            <Link href={"/" + appSitemap.pages.pricing.path}>{pricing}</Link>
            <Link href={`/${appSitemap.pages.news.path}?page=1`}>{news}</Link>
            <Link href="/forms">{form}</Link>
            <Link href={"/" + appSitemap.pages.contact.path}>{contact}</Link>
            <Link href="/faqs">{faqs}</Link>
          </div>
        </div>
      </div>
      <div className=" flex flex-col md:justify-center md:items-center text-label-light">
        <div className="text-center">
          <p>{inc}</p>
        </div>
      </div>
    </>
  );
}
