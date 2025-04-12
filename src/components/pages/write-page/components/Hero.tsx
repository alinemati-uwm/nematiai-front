import React from "react";

import Link from "next/link";

import AppTypo from "@/components/ui/AppTypo";
import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";

function HeroWritepage() {
  const {
    page: {
      write: { podcast_effortlessly_with, turn_ideas_into_podcasts },
    },
    components: {
      menu: { podcast },
    },
  } = useGetDictionary();

  return (
    <div className='flex flex-col-reverse md:flex-row md:justify-between items-center px-6 bg-[url("/images/write/jonathan-farber-gjHmip_Lmg4-unsplash.jpg")] bg-cover bg-center bg-no-repeat rounded relative overflow-hidden py-8'>
      <div className="bg-gradient-to-t from-gray-950 to-transparent absolute left-0 top-0 right-0 bottom-0"></div>
      <div className="flex flex-col gap-y-1 md:gap-y-3 relative text-center md:text-justify pb-4 md:pb-0">
        <AppTypo variant="headingM" className="text-white">
          {podcast_effortlessly_with}
        </AppTypo>
        <AppTypo className="text-white">{turn_ideas_into_podcasts}</AppTypo>
        <div className="md:mt-3 flex justify-center md:justify-normal">
          <Link href="/podcast">
            <Button className="bg-background text-label-dark hover:text-label-lighter">
              {podcast}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroWritepage;
