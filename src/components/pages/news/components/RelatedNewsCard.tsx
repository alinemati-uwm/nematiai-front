import Image from "next/image";

interface Prop {
  title: string;
  desc: string;
  src: string;
  date: string;
  refLink: string;
  link: string;
}
export default function RelatedNewsCard({
  title,
  desc,
  src,
  date,
  refLink,
  link,
}: Prop) {
  return (
    <>
      <div>
        <Image
          src={src}
          alt=""
          width={200}
          height={200}
          className="w-full h-[189px] "
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="">{title}</div>
        <div className="text-[#B9BAC0] ">{desc}</div>
        <div className="text-[#B9BAC0] flex justify-between">
          {/* <Link target="_blank" href={link} className="text-[#FFFF]">
						{refLink}
					</Link> */}
          <p>{date}</p>
        </div>
      </div>
    </>
  );
}
