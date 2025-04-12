import Link from "next/link";

import { Landing_btn } from "@/components/ui/landing-btn";

export default function Buttons({
  download,
  start_chat,
}: {
  download: string;
  start_chat: string;
}) {
  return (
    <>
      <div className=" w-full relative bottom-4 h-full md:text-large flex lg:flex-row items-center lg:items-start lg:justify-start justify-center">
        <Link
          href="#download"
          className="lg:w-[130px]  w-[120px] h-10 lg:h-10  z-20"
        >
          <Landing_btn size="lg">{download}</Landing_btn>
        </Link>
        <Link
          href="/login"
          className="lg:w-[130px] w-[120px] h-10 lg:h-10 z-20"
        >
          <Landing_btn size="lg" variant="secondary">
            {start_chat}
          </Landing_btn>
        </Link>
      </div>
    </>
  );
}
