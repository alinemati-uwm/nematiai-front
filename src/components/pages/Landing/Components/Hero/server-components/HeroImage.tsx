import Image from "next/image";

export default function HeroImage() {
  return (
    <>
      <div className="lg:w-1/2 my-auto xl:mt-auto xl:my-0 z-[3]  ">
        <Image
          src="/images/landing/heroAvatar.webp"
          width={630}
          height={630}
          layout="fixed"
          className=" mx-auto object-cover"
          alt="Hero robot avatar  looking at text"
          priority
        />
      </div>
      {/* <div className="z-1 w-full h-full hidden lg:flex absolute top-0 left-0 opacity-30 ">
				<Image
					src="/images/landing/clusterBg.webp"
					width={700}
					height={200}
					className="rotate-180 w-full opacity-[20%] transform scale-x-[-1] "
					alt="Cluster background of hero robot avatar"
					priority
				/>
			</div> */}
    </>
  );
}
