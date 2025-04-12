import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";

import { type Employee } from "./teams";

const CardContactUs: React.FC<Employee> = ({
  name,
  family,
  avatar,
  role,
  about,
  id,
}) => {
  return (
    <Link
      className="block  w-[80%] lg:w-[209px] lg:h-[320px] bg-glass-dark backdrop-blur-sm rounded-lg mx-auto duration-300 lg:mx-0 hover:scale-105"
      href={`/about/${id}`}
    >
      <div className=" w-fit flex flex-col rounded-lg  px-2 py-5 text-left  md:text-center mx-auto">
        <div className=" flex items-center justify-start gap-3  md:flex-col text-white">
          <img className="h-20 w-20 rounded-full bg-red-500" src={avatar} />
          <div className=" ">
            <h1 className=" text-large  font-medium">
              {name} {family}
            </h1>
            <p className="text-base font-normal">+3 month</p>
            <p className="text-base font-normal text-[#9373EE]">{role.title}</p>
          </div>
        </div>
        <div className="  pt-4 ">
          <p className="text-base font-normal text-[#747474]">
            {about} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Pariatur, sequi?
          </p>
          <div className="flex items-center justify-center gap-5 pt-4">
            <AppIcon
              icon="si:twitter-line"
              width={16}
              className="text-[#747474]"
            />
            <AppIcon
              icon="hugeicons:instagram"
              width={16}
              className="text-[#747474]"
            />
            <AppIcon
              icon="jam:linkedin-square"
              width={16}
              className="text-[#747474]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardContactUs;
