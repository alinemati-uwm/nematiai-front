import Image from "next/image";

import ButtonItems from "./ButtonItems";

export default function BoxContainer({
  download,
  nerd_studio,
  download_nerd_studio_to_enjoy,
  play_store,
  apple_store,
  download_now,
}: {
  download: string;
  nerd_studio: string;
  download_nerd_studio_to_enjoy: string;
  play_store: string;
  apple_store: string;
  download_now: string;
}) {
  return (
    <div className="w-[95%] h-[95%] md:h-full flex flex-col-reverse lg:flex-row bg-glass-dark mx-4 md:mb-4 mt-4 px-6 md:px-0 rounded ">
      <div className="lg:w-[50%]  flex md:flex-col justify-center md:justify-center md:items-center w-full lg:gap-10 ">
        {" "}
        {/* Left section */}
        <div className=" lg:w-full lg:h-[35%] lg:flex flex-col items-center justify-end hidden ">
          <h2 className="text-5xl ">
            {download}{" "}
            <span className="text-landing-primary font-semibold">
              {nerd_studio}
            </span>{" "}
          </h2>
          <p className="w-[75%] mt-5 text-large text-[#BDBDBD] text-center">
            {download_nerd_studio_to_enjoy}
          </p>
        </div>
        <div className=" lg:w-[70%] w-full md:w-[70%]  lg:h-[50%]  flex flex-col justify-center items-center gap-8 pb-8  ">
          <ButtonItems
            play_store={play_store}
            apple_store={apple_store}
            download_now={download_now}
          />
        </div>
      </div>
      <div className="lg:w-[50%] w-full h-full flex items-center justify-center  py-5 ">
        {" "}
        {/* Right section */}
        <Image
          src="/images/download/mobile_background.webp"
          width={600}
          height={600}
          alt="mobile picture"
          className="  "
          priority
        />
      </div>
    </div>
  );
}
