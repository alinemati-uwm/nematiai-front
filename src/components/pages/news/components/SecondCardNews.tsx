import Image from "next/image";

interface Prop {
  title: string;
  desc: string;
  src: string;
  date: string;
  refLink: string;
  link: string;
}
export default function SecondCardNews({
  title,
  desc,
  src,
  date,
  refLink,
  link,
}: Prop) {
  return (
    <div className="h-full w-[191px] rounded-lg bg-glass-dark  p-3 flex flex-col justify-between lg:hover:scale-105 duration-300 cursor-pointer text-white">
      <div>
        <div>
          <Image
            src={src}
            alt=""
            width={100}
            height={100}
            className="w-full h-[118px] rounded-lg"
          />
        </div>
        <div className=" font-bold">
          <p>{title}</p>
        </div>
        <div className="h-10 overflow-hidden text-[#B9BAC0]">
          <p>{desc}</p>
        </div>
      </div>
      <div className="text-[#B9BAC0]">
        {/* <Link href='https://nerdstudio.ai'>{refLink}</Link> */}
        <p>{date}</p>
      </div>
    </div>
  );
}
