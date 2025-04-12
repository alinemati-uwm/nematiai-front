import Image from "next/image";
import Link from "next/link";

export default function ButtonItems({
  play_store,
  apple_store,
  download_now,
}: {
  play_store: string;
  apple_store: string;
  download_now: string;
}) {
  return (
    <>
      <Link
        href="https://play.google.com/store/apps/details?id=com.nerdstudio.app"
        target="_blank"
        className="border w-full sm:w-full h-16  rounded flex justify-center items-center cursor-pointer "
      >
        <div className="flex justify-center items-center ">
          <Image
            src="/images/landing/googlePlay_logo.webp"
            alt="google play icon"
            width={17}
            height={17}
            className="mr-2"
          />
          <p className="text-large">{play_store}</p>
        </div>
      </Link>
      <div className="border w-full sm:w-full h-16 rounded flex justify-center items-center cursor-pointer ">
        <div className="flex justify-center items-center pl-3">
          <Image
            src="/images/landing/apple_logo.webp"
            alt="Apple store icon"
            width={25}
            height={25}
            className=" mr-2"
            quality={100}
          />
          <p className="text-large">{apple_store}</p>
        </div>
      </div>
      <div className="border w-full sm:w-full h-16 rounded flex justify-center items-center cursor-pointer">
        <div className="flex justify-center items-center pl-9">
          <Image
            src="/images/landing/download_logo.svg"
            alt="Direct download icon"
            width={25}
            height={25}
            className=" mr-2"
          />
          <p className="text-large">{download_now}</p>
        </div>
      </div>
    </>
  );
}
