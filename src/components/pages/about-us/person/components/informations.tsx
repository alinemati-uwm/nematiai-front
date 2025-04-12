import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";

export interface EmployeeData {
  id: string;
  name: string;
  family: string;
  avatar: string;
  role: { title: string };
  about: string;
  review: string;
  services: string;
  favorites: string;
}

interface Props {
  data?: EmployeeData;
}
const Information = ({ data }: Props) => {
  return (
    <>
      <div className=" mx-4 flex flex-col items-center gap-8      ">
        <p className="text-white text-3xl leading-tight font-[400]">
          {data?.name} {data?.family}
        </p>
        <p className=" text-large leading-normal font-[500] text-primary">
          {data?.role.title}
        </p>
        <p className="text-base leading-normal font-[400] text-[#B9BAC0]">
          Start At 16 April 2022 to 24 June 2023
        </p>
        <div className="flex items-center justify-center gap-8 pt-4">
          <Link
            href="https://www.linkedin.com/in/reza-nemati-fwd?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
          >
            <AppIcon
              width={20}
              height={20}
              icon="ph:linkedin-logo-bold"
              className="text-[#747474]"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Information;
