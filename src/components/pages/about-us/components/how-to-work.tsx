import React from "react";

const HowToWork = () => {
  return (
    <div className="w-full flex flex-col gap-12 ">
      <div className="text-shadow-custom-purple text-white mx-auto  text-2xl lg:text-4xl font-[500] ">
        How we work at <span className="text-primary">Nerd Studio</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 gap-16 lg:mx-[165px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
          return (
            <div key={item}>
              <div className=" mx-auto w-[70%] max-w-[350px] lg:w-[302px] gap-2 lg: h-[244px] bg-glass-dark flex flex-col items-center   backdrop-blur-sm relative z-20 text-white  rounded-lg ">
                <img
                  src="/images/backgrounds/image-21.png"
                  className="w-full h-[127px] rounded-t-lg"
                  alt="landing page"
                />

                <div className="text-white text-large font-[500] leading-normal">
                  care about our team{" "}
                </div>
                <div className="text-[#B9BAC0] justify-center text-base font-[400] leading-tight mx-4">
                  Understand what is important for our employees.Give them what
                  they need to do their best work{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowToWork;
