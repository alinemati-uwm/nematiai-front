import Image from "next/image";
import Link from "next/link";

interface Prop {
  count: number;
  title: string;
  image: string;
  topic: {
    title: string;
    slug: string;
  };
  id: string;
}
export default function FirstCardNews({
  count,
  title,
  image,
  topic,
  id,
}: Prop) {
  return (
    <Link
      href={`/news/${id}`}
      className="lg:w-[398px] md:text-large w-full  flex items-center gap-3 h-20 rounded-lg relative bg-glass-dark p-2 cursor-pointer"
    >
      <div className=" lg:w-[20%] rounded-lg  h-full lg:hover:scale-105 duration-300">
        <Image
          src={image}
          alt=""
          unoptimized
          width={100}
          height={100}
          className="lg:w-full h-full rounded-lg "
        />
      </div>
      <div className=" h-full w-[70%] flex flex-col justify-center  truncate ">
        <p className="text-white">{topic.title}</p>
        <p className="text-[#B9BAC0]">{title} </p>
      </div>
      <div className="text-white absolute right-2 top-6 md:top-5 text-base">
        <p> #{count}</p>
      </div>
    </Link>
  );
}
