import React from "react";

import { type EmployeeData } from "@/components/pages/about-us/person/components/informations";

interface Props {
  data?: EmployeeData;
}

const services = [
  "UX",
  "Information Architecture",
  "Website Design",
  "Drupal Developmen",
];
const favorites = [
  "Snacking (chocolate and chips)",
  "Camping and laying in the sunshine",
  "Visiting Australia (and more laying in sunshine)",
  "Trying new things!",
];
const AboutPerson = ({ data }: Props) => {
  return (
    <div className="w-full mt-20 lg:mt-0">
      <div className="mx-4 flex flex-col gap-8 ">
        <div className="flex flex-col gap-8">
          <p className="text-2xl lg:text-4xl  font-[500] text-white">
            About {data?.name}
          </p>
          <p className="text-large leading-normal font-[300] text-[#B9BAC0]">
            Born and raised in Seattle, I&apos;ve worked as a digital
            producer/product manager at various creative agencies around town.
            At Moz, I have the pleasure of working with the amazing product tea
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-2xl lg:text-4xl  font-[500] text-white">
            {data?.name} Review
          </p>
          <p className="text-large leading-normal font-[300] text-[#B9BAC0] text-left">
            Reza Nemati needs no introduction. They are one of the top schools
            in the country with a reputation that punches well above its
            weight—locally and internationally. Founded prior to Canadian
            Confederation, for nearly 200 years Queen’s has produced some of the
            best and brightest minds in the 21st century. With a laundry list of
            notable alumni including the likes of Elon Musk, Gord Downie,
            Michael Ondaatje, Wendy Creson and many, many, many more, it’s
            perhaps not surprising that Queen’s quarterly publication, “Queen’s
            Alumni Review”, has become an institutional pillar since it’s start
            in 1927 – with a readership exceeding 125,000 people globally. With
            a refresh of its physical publication underway, Queen’s asked
            Massive to help bring its new design to life online in a way that
            reflects the university’s bold, innovative, and pioneering spirit.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-2xl lg:text-4xl  font-[500] text-white">
            Services
          </p>
          <ul className="list-disc list-inside pl-4  text-large">
            {services.map(item => {
              return (
                <li key={item} className="text-[#B9BAC0] font-[300]  ">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-2xl lg:text-4xl  font-[500] text-white">
            Exprience
          </p>
          <ul className="list-disc list-inside pl-4  text-large">
            {services.map(item => {
              return (
                <li key={item} className="text-[#B9BAC0] font-[300] ">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-2xl lg:text-4xl  font-[500] text-white">
            A few of my favourite things
          </p>
          <ul className="list-disc list-inside pl-4  text-large">
            {favorites.map(item => {
              return (
                <li key={item} className="text-[#B9BAC0] font-[300] ">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPerson;
