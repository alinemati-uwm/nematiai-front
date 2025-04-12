import React, { useState } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";

import { featuresIcons } from "@/components/pages/Landing/common/navbarDropDown";
import AppIcon from "@/components/shared/AppIcon";
// Import the close icon
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { appSitemap } from "@/constants/sitemap";
import { useGetDictionary } from "@/hooks";
import { APP_ROUTES } from "@/refactor_lib/constants";

const DropdownMenuLanding = () => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState("pedro");
  const [menuOpen, setMenuOpen] = useState(false); // State to track if menu is open
  const {
    navbar: {
      get_start,
      features,
      news,
      prices,
      app_store,
      resources,
      community,
      contact_us,
    },
  } = useGetDictionary();

  return (
    <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className="text-violet11 inline-flex h-8 w-8 items-center justify-center rounded-full text-3xl text-white  outline-none "
          aria-label="Customise options"
        >
          {menuOpen ? (
            <AppIcon icon="radix-icons:cross-1" />
          ) : (
            <AppIcon icon="radix-icons:hamburger-menu" />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[50] max-h-[600px] overflow-y-scroll w-screen animate-slideDownAndFade rounded-b  bg-primary-lighter p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={15}
          data-state={menuOpen ? "open" : "closed"} // Use the state to apply animation
        >
          <div className="h-auto w-full">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="mx-5 items-center justify-start gap-2 py-5 text-large font-[600] ">
                  {" "}
                  {features}{" "}
                </AccordionTrigger>
                <AccordionContent className="h-auto">
                  {appSitemap.pages.features.pages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex max-h-12 items-center  border-b border-gray-200 ",
                          index ===
                            appSitemap.pages.features.pages.length - 1 &&
                            "border-b-0",
                        )}
                      >
                        <Link
                          href={
                            "/" + appSitemap.pages.features.path + "/" + item
                          }
                          className="mx-8 flex flex-row items-center gap-5 py-2 text-large"
                        >
                          <Image
                            src={featuresIcons[item]}
                            height={325}
                            width={35}
                            className=""
                            alt="image"
                          />
                          {/*<div className="w-8 h-8   ">*/}

                          {/*  <img src={item.icon}*/}

                          {/*       alt={"landing page"} />*/}

                          {/*</div>*/}
                          <div className=" font-[500] text-black ">
                            {" "}
                            {capitalizeFirstLetter(item)}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="item-2">
								<AccordionTrigger className="mx-5 items-center justify-start gap-2 py-5 text-large font-[600] ">
									{" "}
									Solutions{" "}
								</AccordionTrigger>
								<AccordionContent className="mx-8 flex flex-col gap-5 text-large font-[500] text-black">
									<div className="flex w-full flex-row items-center justify-between">
										<span>Help </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div>
									<div className="flex w-full flex-row items-center justify-between">
										<span>Marketing </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div>
									<div className="flex w-full flex-row items-center justify-between">
										<span>Sales </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div>
									<div className="flex w-full flex-row items-center justify-between">
										<span>Supports </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div>
									<div className="flex w-full flex-row items-center justify-between">
										<span>Personal </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem> */}

              <AccordionItem value="item-3">
                <AccordionTrigger className="mx-5 items-center justify-start gap-2 py-5 text-large font-[600] ">
                  {" "}
                  {resources}{" "}
                </AccordionTrigger>
                <AccordionContent className="mx-8 flex flex-col gap-5 text-large font-[500] text-black">
                  {/* <div className="flex w-full flex-row items-center justify-between">
										<span>Help </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div>
									<div className="flex w-full flex-row items-center justify-between">
										<span>Blog </span>
										<div className="flex h-8 w-12 justify-center rounded-lg bg-blue-950 text-large text-white ">
											<span className="mt-1">Soon</span>
										</div>
									</div> */}
                  <Link
                    target="_blank"
                    href="https://discord.gg/KrFTV64NvS"
                    className="flex w-full flex-row items-center justify-between"
                  >
                    <span>{community} </span>
                  </Link>
                  <div className="flex w-full flex-row items-center justify-between">
                    <span>{contact_us}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href={"/" + appSitemap.pages.pricing.path}
              className="flex flex-col gap-5 border-b border-gray-200  py-5 text-large font-[500] text-black"
            >
              <span className="mx-5"> {prices}</span>
            </Link>
            <span className="flex flex-col gap-5 py-5 text-large  font-[500] text-black">
              <span className="mx-5"> {app_store}</span>
            </span>
            <Link
              href={`/${appSitemap.pages.news.path}?page=1`}
              className="flex flex-col gap-5 border-b border-gray-200  py-5 text-large font-[500] text-black"
            >
              <span className="mx-5"> {news}</span>
            </Link>
          </div>
          <Link
            href={APP_ROUTES.login}
            className="mx-auto my-5 flex h-12 w-[90%] items-center justify-center rounded-lg bg-primary active:bg-primary-dark text-2xl font-[600] text-primary-lighter"
          >
            {" "}
            {get_start}
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuLanding;
