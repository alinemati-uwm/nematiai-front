"use client";

import { useGetDictionary } from "@/hooks";

import Footer from "../Landing/layout/Footer";
import Navbar from "../Landing/layout/Navbar";
import BoxContainer from "./Components/BoxContainer";

export default function Download() {
  const {
    common: { nerd_app, download },
    page: {
      download: { download_nerd_studio_to_enjoy },
    },
    components: {
      landing: { play_store, apple_store, download_now },
    },
  } = useGetDictionary();
  return (
    <section className="bg-gradient-to-tr from-[#312158]  text-white md:w-screen md:min-h-[100vh] flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-full h-full md:h-full mt-16 mb-10 md:mb-0  flex justify-center">
        {" "}
        {/* Box Container */}
        <BoxContainer
          download={download}
          download_nerd_studio_to_enjoy={download_nerd_studio_to_enjoy}
          play_store={play_store}
          apple_store={apple_store}
          download_now={download_now}
          nerd_studio={nerd_app}
        />
      </div>
      <div className="w-[100%] h-[100%] mt-10">
        <Footer />
      </div>
    </section>
  );
}
