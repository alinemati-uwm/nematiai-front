import Image from "next/image";

export default function StarImage() {
  return (
    <>
      <div className="z-1 w-5  h-5 hidden lg:flex absolute top-[220px] right-[150px]  opacity-30   ">
        <Image
          src="/images/landing/first_Star.png"
          width={700}
          height={200}
          className=" "
          alt="The image of the first star complements the image of the hero robot"
        />
      </div>
      <div className="z-1 h-5 w-5 hidden lg:flex absolute top-[200px] right-[150px] opacity-30 ">
        <Image
          src="/images/landing/second_Star.png"
          width={20}
          height={20}
          className=""
          alt="The image of the second star complements the image of the hero robot"
        />
      </div>
    </>
  );
}
