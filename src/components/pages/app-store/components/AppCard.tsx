"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import AppIcon from "@/components/shared/AppIcon";
import { Button } from "@/components/ui/button";
import { separateNumber } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import type { AppItem } from "@/services/types";

/**
 * use for app list item in app store
 * @param app app item
 * @constructor
 */
function AppCard({ app }: { app: AppItem }) {
  const {
    page: {
      store: { add_button_label },
    },
  } = useGetDictionary();
  const { lang } = useParams(); // get current language for add to link

  return (
    <Link href={`/${lang}${app.url}`}>
      <article className="col w-full cursor-pointer gap-3 rounded-md border bg-holder-lighter p-4 transition-all duration-300 hover:shadow-card-hover">
        <div className="spacing-row">
          {/* app logo*/}
          <Image
            src={app.imageUrl}
            alt={app.title}
            width={80}
            height={80}
            className="h-10 w-10 rounded-md"
          />
          {/*how many times app added to workspace*/}
          <p className="row gap-1 text-small font-light text-label-light">
            <AppIcon width={10} icon="material-symbols:install-desktop" />
            {separateNumber(app.installCount.toString())}
          </p>
        </div>

        <h3>{app.title}</h3>
        {/* show description max 2 line with line-clamp-2*/}
        <p className="line-clamp-2 font-normal text-label-light">
          {app.description}
        </p>

        <div className="spacing-row">
          {/*
           * app category
           */}
          <span className="rounded-md bg-muted px-3 py-1.5 text-small capitalize">
            {app.category}
          </span>
          {/*
           * add to workspace button
           */}
          <Button
            className="z-10"
            size="sm"
            onClick={e => {
              e.preventDefault();
            }}
          >
            <AppIcon icon="ion:add" className="me-2 h-4 w-4" />{" "}
            {add_button_label}
          </Button>
        </div>
      </article>
    </Link>
  );
}

export default AppCard;
