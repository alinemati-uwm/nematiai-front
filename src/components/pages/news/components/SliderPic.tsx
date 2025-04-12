"use client";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

interface Prop {
  news?: {
    images: string;
    source_url: string;
    title: string;
    publisher: string;
  }[];
}
export default function SliderPic({ news }: Prop) {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = ({ s, time, progress }: any) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{ enabled: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper md:mb-6"
      >
        {news?.map((item, key) => (
          <>
            <SwiperSlide key={key} className=" relative  w-full ">
              <Link href={item.source_url} target="_blank" rel="follow">
                <Image
                  src={item.images}
                  unoptimized
                  alt={`News image from cbc sport ${item.publisher}`}
                  width={500}
                  height={200}
                  className="w-full md:h-[460px] h-[200px]  rounded"
                  priority
                />
              </Link>
              <div className="absolute bottom-3 left-3  flex-col gap-2  text-white flex  ">
                <p className="md:font-bold md:text-large">{item.title}</p>
                <p className="text-small ">{item.publisher}</p>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}
