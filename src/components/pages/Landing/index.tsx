import Image from "next/image";

import FAQ from "@/components/pages/Landing/common/FAQ";
import Comments from "@/components/pages/Landing/Components/comments";
import Features from "@/components/pages/Landing/Components/Features";
import Gpts from "@/components/pages/Landing/Components/Gpts";
import Hero from "@/components/pages/Landing/Components/Hero";
import MapWorld from "@/components/pages/Landing/Components/MapWorld";
import Mobile from "@/components/pages/Landing/Components/Mobile";
import Services from "@/components/pages/Landing/Components/Services";
import Steps from "@/components/pages/Landing/Components/Steps";
import Footer from "@/components/pages/Landing/layout/Footer";
import Navbar from "@/components/pages/Landing/layout/Navbar";
import type { Landing } from "@/services/static-pages/landing";

export default function Landing({ data }: { data: Landing | undefined }) {
  return (
    <>
      <div className=" mx-auto  h-full w-full max-w-[1920px] overflow-x-hidden relative ">
        <Navbar />
        <main className="mt-20 px-4 lg:px-0">
          <Hero />
          <div className=" relative ">
            <Gpts />
            <Features />
            <div className="hidden lg:flex absolute top-[1300px] right-0 z-0">
              <Image
                src="/images/landing/circle_groupe.webp"
                width={1100}
                height={650}
                className="w-full h-full "
                alt="Circular background connected with line"
              />
            </div>
            <div className="flex absolute top-[2500px] right-0 z-10 ">
              <Image
                src="/images/landing/spiral.webp"
                width={1000}
                height={450}
                className="w-full h-full "
                alt="Spiral circle background"
              />
            </div>
            <div className="flex hero-absolute-right-mobile w-full h-[300px]  absolute lg:hidden top-[2500px] right-0 -z-0 " />

            <div className="flex absolute top-[3200px] lg:top-[3500px] left-0 -z-0 ">
              <Image
                src="/images/landing/square_spiral.webp"
                width={1000}
                height={450}
                className="w-full h-full "
                alt="Spiral square background"
              />
            </div>
            <div className="flex hero-absolute-right-mobile w-full h-[500px]  absolute lg:hidden top-[3200px] right-0 -z-0 " />
            <div className="flex hero-absolute-right-mobile w-full h-[500px]  absolute lg:hidden top-[3800px] right-0 -z-0 " />
            <div className="hero-absolute-service hidden lg:flex absolute top-[3500px]  right-0 z-0 w-[600px] h-[1540px]   rounded-full" />
            <Steps />
          </div>
          <Services services={data?.services} />

          <Comments comments={data?.comments} />
          {/*<PromptsSection prompts={data?.apps} />*/}
          {/*<CustomPrompt />*/}
          <Mobile />
          <div className="hidden lg:flex absolute top-[5000px] right-20 -z-0">
            <Image
              src="/images/landing/linear_spiral.webp"
              width={1000}
              height={450}
              className="w-full opacity-50 h-full z-0  "
              alt="linear spiral background"
            />
          </div>
          <div className="hero-absolute-left pointer-events-none hidden lg:flex absolute top-[7000px] lg:-left-[60%] xl:-left-[50%] 2xl:-left-[40%] z-0 w-[540px] h-[400px] xl:h-[840px]   rounded-full" />

          {data && data.faqs && <FAQ faqs={data.faqs} />}
          <MapWorld />

          {/*<div*/}
          {/*  className="hidden lg:flex absolute top-[9000px] left z-0 ">*/}
          {/*  <Image src={"/images/backgrounds/group-51.png"} width={1000}*/}
          {/*         height={450}*/}
          {/*         className="w-full h-full " alt={"landing page"} />*/}

          {/*</div>*/}

          {/* <DownloadApp /> */}
        </main>

        <div className="hero-absolute-left hidden lg:flex absolute top-0 lg:-right-[60%] xl:-right-[50%] 2xl:-right-[40%] z-0 w-[940px] h-[840px]   rounded-full" />
        <div className="hero-absolute-right absolute top-[500px] left-0 z-0 w-[640px] h-[1440px]   rounded-full" />

        {/*<div*/}
        {/*  className="hero-absolute-right absolute top-[5900px] right-0 z-0 w-[640px] h-[800px]   rounded-full" />*/}
      </div>

      <Footer />
    </>
  );
}
