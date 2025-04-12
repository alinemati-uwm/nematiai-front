import Image from "next/image";

const HeroSectionPerson = ({ data }: any) => {
  return (
    <div className="flex h-[580px] pt-20 lg:h-[760px] w-full flex-col items-center justify-start gap-3 md:gap-16 bg-[#EABB42]  text-center md:flex-row md:items-center md:justify-center">
      <div className=" relative">
        <img
          src="/images/pattern.svg"
          className="absolute left-0  top-0 h-16 w-16 md:h-16  md:w-16 2xl:h-32 2xl:w-32"
          alt=""
        />
        <Image
          height={100}
          width={100}
          quality={100}
          layout="responsive"
          className="min-w-[221px] min-h-[221px] rounded-full border-[25px] border-[#9373EE] md:h-96 md:w-96"
          src="/images/imageprofile.png"
          alt=""
        />
        <img
          src="/images/pattern.svg"
          className="absolute bottom-0  right-0 h-16 w-16 md:h-16  md:w-16 2xl:h-32 2xl:w-32"
          alt=""
        />
      </div>
      <div className="w-full flex flex-col gap-6  md:w-1/4 md:text-left">
        <h1 className=" mt-3 text-3xl font-[600] leading-tight lg:text-5xl text-black">
          {data?.name} {data?.family}
        </h1>
        <p className="text-large font-normal text-[#5729DA]">
          {data?.role.title}
        </p>
        <p className="text-base font-normal text-[#747474]">{data?.about}</p>
      </div>
    </div>
  );
};

export default HeroSectionPerson;
