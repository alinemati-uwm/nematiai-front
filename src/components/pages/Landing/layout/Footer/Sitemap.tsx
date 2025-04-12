import React from "react";

import Link from "next/link";

import { metadataBase } from "@/constants/app-info";
import { appSitemap } from "@/constants/sitemap";

function Sitemap() {
  const sitemap = appSitemap;

  return (
    <div className="hidden">
      {sitemap.langs.map((el, key) => (
        <Link
          key={key}
          href={`${metadataBase}/${el}`}
          hrefLang={el}
        >{`${metadataBase}/${el}`}</Link>
      ))}

      {["", ...sitemap.langs].map(lang =>
        Object.keys(sitemap.pages).map((el, index) =>
          sitemap.pages[el].pages.length ? (
            sitemap.pages[el].pages.map((page, key) => (
              <Link
                href={`${metadataBase}/${lang ? lang + "/" : ""}${el}/${page}`}
                key={key}
                hrefLang={lang}
              >
                {`${metadataBase}/${lang ? lang + "/" : ""}${el}/${page}`}
              </Link>
            ))
          ) : (
            <Link
              href={`${metadataBase}${lang ? "/" + lang : ""}/${el}`}
              key={index}
              hrefLang={lang}
            >
              {`${metadataBase}${lang ? "/" + lang : ""}/${el}`}
            </Link>
          ),
        ),
      )}
    </div>
  );
}

export default Sitemap;
