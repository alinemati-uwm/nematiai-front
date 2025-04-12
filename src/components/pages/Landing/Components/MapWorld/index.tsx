"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import TitleSection from "@/components/pages/Landing/common/TitleSection";
import geo from "@/constants/geo.json";
import { useGetDictionary } from "@/hooks";

import commentsLandingModel from "../comments/model";
import MarkContainer from "./MarkContainer";

const MapWorld = () => {
  const {
    components: {
      landing: {
        nerd_studio_available_everywhere,
        doesnt_matter_where_you_are,
        our_story,
      },
    },
  } = useGetDictionary();
  return (
    <div className="relative padding-x mt-0 py-6 md:mt-20 lg:py-3 2xl:py-3 z-10">
      {/*Title section*/}
      <TitleSection
        customTrue={true}
        customize={
          <div className="mb-6 flex flex-col">
            <h2 className="text-title mb-6 text-center  leading-normal">
              <span className=" px-1.5 text-landing-primary text-shadow-custom-purple text-2xl leading-relaxed lg:text-5xl font-[400] capitalize ">
                {nerd_studio_available_everywhere}
              </span>
              <br />
              <span className="text-shadow-custom-purple lg:text-5xl text-2xl text-white font-[400] leading-relaxed  capitalize">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {doesnt_matter_where_you_are}
              </span>
            </h2>
            <div className=" text-center  ">
              <span className="md:text-large text-base text-landing-muted">
                {our_story}
              </span>
            </div>
          </div>
        }
      />

      <div className="flex flex-1 justify-center p-0">
        <div className="flex w-full items-center justify-center relative">
          <ComposableMap>
            <Geographies geography={geo}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    style={{
                      pressed: {
                        fill: "rgba(238,68,34,0.01)",
                      },
                    }}
                    fill="#9D7AFF" // Change fill color to blue
                    key={geo.rsmKey}
                    geography={geo}
                    name={geo.name}
                  />
                ))
              }
            </Geographies>
            {commentsLandingModel.items.map((item, index) => (
              <MarkContainer key={index} item={item} />
            ))}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};

export default MapWorld;
