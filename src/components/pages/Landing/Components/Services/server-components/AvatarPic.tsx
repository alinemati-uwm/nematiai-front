import Image from "next/image";

import { cn } from "@/lib/utils";

export default function AvatarPic() {
  return (
    <>
      <div className={cn("w-full relative h-full mt-auto")}>
        <div className="relative z-10 flex justify-center mx-auto lg:mx-0 bg-transparent">
          <Image
            src="/images/landing/serviceRobotPic.webp"
            width={500}
            height={500}
            className="relative z-10 mx-auto lg:mx-0 object-cover"
            alt="A combination of human and robot photo"
            quality={100}
          />
        </div>
        <div className="hero-absolute-bottom hidden lg:flex absolute top-0 left-30 z-0 w-[500px] h-[200px] rounded-full bg-gray-200" />
      </div>
    </>
  );
}
