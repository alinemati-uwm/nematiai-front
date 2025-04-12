"use client";

import * as React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";

import AppIcon from "@/components/shared/AppIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { appSitemap } from "@/constants/sitemap";
import { useGetDictionary } from "@/hooks";

export const featuresIcons = {
  chatbot: "/images/header/chatbot_logo.webp",
  grammar: "/images/header/grammar_logo.webp",
  humanize: "/images/header/translate_logo.webp",
  rewrite: "/images/header/rewrite_logo.webp",
  image: "/images/header/image_logo.webp",
  code: "/images/header/code_logo.webp",
  document: "/images/header/chatpdf_logo.png",
  podcast: "/images/header/podcast.svg",
};

const solutionsOption = [
  { title: "Marketing", icon: "/images/landing/marketing_icon.png" },
  { title: "Sales", icon: "/images/landing/sale_icon.png" },
  { title: "Support", icon: "/images/landing/support_icon.png" },
  { title: "Personal", icon: "/images/landing/personal_icon.png" },
];
export const resourcesOptions = [
  // {
  // 	title: "Help Docs",
  // 	icon: "/images/landing/help_icon.png",
  // 	isExist: false,
  // 	link: "",
  // },
  {
    title: "Community",
    icon: "/images/header/community.webp",
    isExist: true,
    link: "https://discord.gg/KrFTV64NvS",
  },
  {
    title: "Contact Us",
    icon: "/images/header/contact_us.webp",
    isExist: true,
    link: "/" + appSitemap.pages.contact.path,
  },
];
export function NavigationMenuDropDown() {
  const {
    navbar: { coming_soon, features, news, prices, resources },
  } = useGetDictionary();
  return (
    <div className="flex relative gap-8  h-full">
      <HoverCard openDelay={10} closeDelay={2}>
        <HoverCardTrigger className="text-white text-large mx-5 flex items-center gap-1 cursor-pointer">
          {features}{" "}
          <AppIcon
            icon="ion:chevron-down"
            className="text-violet10 relative top-0.5 transition-transform duration-300 ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </HoverCardTrigger>
        <HoverCardContent
          side="bottom"
          sideOffset={0}
          className="bg-[#1F0A5866] bg-opacity-[40]  border-0.25 border-seperator backdrop-blur-xl w-auto grid grid-cols-2 shadow-custom-shadow"
        >
          {appSitemap.pages.features.pages.length &&
            appSitemap.pages.features.pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={"/" + appSitemap.pages.features.path + "/" + item}
                  className="flex h-16   w-[200px]   px-2   items-center transition-all duration-300  hover:bg-[#545454] hover:text-black rounded-lg cursor-pointer  "
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-8 h-8   ">
                      <Image
                        width={80}
                        height={80}
                        src={featuresIcons[item]}
                        className="w-full h-full "
                        alt={`${item} icon in navbar`}
                      />
                    </div>
                    <div className="text-white text-base">
                      {capitalizeFirstLetter(item)}
                    </div>
                  </div>
                </Link>
              );
            })}
        </HoverCardContent>
      </HoverCard>

      {/* <HoverCard openDelay={10} closeDelay={2}>
				<HoverCardTrigger className="text-white text-large flex items-center gap-1 cursor-pointer">
					Solutions{" "}
					<AppIcon
						icon="ion:chevron-down"
						className="text-violet10  relative top-0.5 transition-transform duration-300 ease-in group-data-[state=open]:-rotate-180"
						aria-hidden
					/>
				</HoverCardTrigger>
				<HoverCardContent
					side="bottom"
					sideOffset={0}
					className="bg-[#1F0A5866] bg-opacity-[40] border-0.25 border-seperator flex flex-col  backdrop-blur-2xl w-auto   shadow-custom-shadow cursor-pointer"
				>
					{solutionsOption.map((item, index) => {
						return (
							<HoverCard key={item.title} openDelay={0} closeDelay={0}>
								<HoverCardTrigger>
									<div className="hover:bg-[#545454] transition-all duration-300 w-[130px]  h-8 items-center flex flex-row rounded-lg cursor-pointer">
										<div className="flex flex-row text-white gap-4 item-center ml-2 text-base ">
											<div className="w-6 h-6   ">
												<img
													src={item.icon}
													className="w-full h-full "
													alt="landing page"
												/>
											</div>
											<div>{item.title}</div>
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent
									side="right"
									sideOffset={15}
									className="w-[130px] h-8 flex items-center rounded-lg text-center bg-[#5CB455] ml-1 text-white"
								>
									<AppIcon icon="ion:time-outline" width={14} />{" "}
									<span className="text-small ml-1 ">Coming Soon</span>
								</HoverCardContent>
							</HoverCard>
						);
					})}
				</HoverCardContent>
			</HoverCard> */}
      <HoverCard openDelay={10} closeDelay={2}>
        <HoverCardTrigger className="text-white text-large flex items-center gap-1 cursor-pointer">
          {resources}{" "}
          <AppIcon
            icon="ion:chevron-down"
            className="text-violet10  relative top-0.5 transition-transform duration-300 ease-in group-data-[state=open]:-rotate-180"
            aria-hidden
          />
        </HoverCardTrigger>
        <HoverCardContent
          side="bottom"
          sideOffset={0}
          className="bg-[#1F0A5866] bg-opacity-[40]  border-0.25 border-seperator flex flex-col  backdrop-blur-2xl w-auto   shadow-custom-shadow cursor-pointer"
        >
          {resourcesOptions.map(item => {
            return (
              <HoverCard key={item.title} openDelay={0} closeDelay={0}>
                <HoverCardTrigger>
                  <Link
                    href={item.link}
                    target={item.link.search("http") >= 0 ? "_blank" : "_self"}
                  >
                    <div className="hover:bg-[#545454] transition-all duration-300 w-[130px]  h-8 items-center flex flex-row rounded-lg">
                      <div className="flex flex-row text-white gap-4 item-center ml-2 text-base ">
                        <div className="w-6 h-6   ">
                          <Image
                            width={50}
                            height={50}
                            src={item.icon}
                            className="w-full h-full "
                            alt={`${item.title} icon in navbar`}
                          />
                        </div>
                        <div>{item.title}</div>
                        {/*<div*/}
                        {/*  className="w-8 flex justify-center h-4 text-small rounded-lg bg-blue-950 text-white my-auto ">*/}
                        {/*    <span className="">Soon</span></div>*/}
                      </div>
                    </div>
                  </Link>
                </HoverCardTrigger>
                {item.isExist ? (
                  ""
                ) : (
                  <HoverCardContent
                    side="right"
                    sideOffset={15}
                    className="w-[130px] h-8 flex items-center rounded-lg text-center bg-[#5CB455] ml-1 text-white"
                  >
                    <AppIcon icon="ion:time-outline" width={14} />{" "}
                    <span className="text-small ml-1">{coming_soon}</span>
                  </HoverCardContent>
                )}
              </HoverCard>
            );
          })}
        </HoverCardContent>
      </HoverCard>
      <div className="flex flex-row gap-10 text-large font-[400] ">
        <Link
          href={"/" + appSitemap.pages.pricing.path}
          className="text-white my-auto cursor-pointer"
        >
          {prices}
        </Link>
      </div>
      <div className="flex flex-row gap-10 text-large font-[400] ">
        <Link
          href={`/${appSitemap.pages.news.path}?page=1`}
          className="text-white my-auto cursor-pointer"
        >
          {news}
        </Link>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-small  leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-label-light">
            {children}
          </p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
