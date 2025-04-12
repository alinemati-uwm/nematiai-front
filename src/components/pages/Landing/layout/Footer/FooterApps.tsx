import React from "react";

import Image from "next/image";
import Link from "next/link";

function FooterApps({ get_app }: { get_app: string }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-large font-[500]">{get_app}</span>
      {/*map this here*/}
      <Link href="https://www.apple.com/app-store/" target="blank">
        <Image
          width={135}
          height={40}
          src="/images/footer/appleStore.webp"
          alt="appleStore"
          quality={100}
          className=" cursor-pointer"
        />
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=com.nerdstudio.app"
        target="blank"
      >
        <Image
          width={135}
          height={40}
          src="/images/footer/playStore.webp"
          alt="appleStore"
          quality={100}
          className=" cursor-pointer"
        />
      </Link>
    </div>
  );
}

export default FooterApps;
