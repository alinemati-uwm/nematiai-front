"use client";

import React from "react";

import Image from "next/image";

import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade } from "swiper/modules";

import AppSwiper from "@/components/shared/AppSwiper";

function LoginSlideshow() {
  const items = [
    "/images/auth/slide1.png",
    "/images/auth/slide2.png",
    "/images/auth/slide3.png",
  ];

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0">
      <AppSwiper
        SwiperSlideProps={{ style: { width: "100%" } }}
        config={{
          spaceBetween: 0,
          autoplay: { delay: 5000, disableOnInteraction: false },
          effect: "fade",
          modules: [Autoplay, EffectFade],
          slidesPerView: 1,
          loop: true,
        }}
      >
        {items.map((el, key) => (
          <div key={key}>
            <Image
              src={el}
              unoptimized
              alt=""
              layout="fill"
              className="object-cover"
            />
          </div>
        ))}
      </AppSwiper>
    </div>
  );
}

export default LoginSlideshow;
