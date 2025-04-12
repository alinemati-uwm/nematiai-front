const HeroSection = () => {
  return (
    <div className="relative z-20 flex h-[580px] lg:h-[680px] w-full  flex-col items-center  justify-start gap-5 bg-[#EABB42] px-4 pt-[6rem] md:flex-row-reverse md:justify-around md:px-[10%]  ">
      <div className="flex relative h-auto  w-auto  items-center  justify-center rounded-lg  border-dashed border-3 md:h-2/3 md:w-2/4 max-w-[500px] ">
        <img
          src="/images/image20.svg"
          className=" z-0 translate-x-6 translate-y-3 md:h-full md:absolute -right-10 "
          alt=""
        />
      </div>
      <div className="w-full md:space-y-5 text-center md:w-1/3 md:text-start lg:pl-5">
        <h1 className=" md:text-4xl text-large font-bold md:font-semibold -tracking-tighter">
          About Us
        </h1>
        <p className="text-base font-normal text-[#747474] md:py-3 md:text-2xl">
          Any question or remarks? Just write us a message!
        </p>
        <a href="#ourTeam" className="w-full h-full">
          <button className=" w-full rounded-md  bg-white py-3 mt-4  text-[#EABB42] text-large duration-300  lg:hover:bg-[#5729DA] active:bg-[#5729DA] lg:hover:text-white md:h-12 md:w-[155px]  md:py-0">
            Our Team
          </button>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
