import * as React from "react";
import { Children, type PropsWithChildren, type ReactNode } from "react";

import "swiper/css";
import "swiper/css/pagination";

import {
  Swiper,
  SwiperSlide,
  type SwiperProps,
  type SwiperRef,
  type SwiperSlideProps,
} from "swiper/react";
import { type SwiperOptions } from "swiper/types";

export type appSwiperTypes = {
  children: ReactNode;
  config?: React.RefAttributes<SwiperRef> &
    PropsWithChildren<SwiperOptions> &
    SwiperProps;
  SwiperSlideProps?: SwiperSlideProps;
  style?: React.CSSProperties;
};

export default function AppSwiper({
  children,
  config,
  style,
  SwiperSlideProps,
}: appSwiperTypes) {
  return (
    <Swiper {...config} className="w-full flex flex-col h-full" style={style}>
      {Children.map(children, child => {
        return <SwiperSlide {...SwiperSlideProps}>{child}</SwiperSlide>;
      })}
    </Swiper>
  );
}
