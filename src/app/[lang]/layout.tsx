import React from "react";
import type { Metadata, Viewport } from "next";

import { DM_Sans } from "next/font/google";

import "@/config/globals.css";
import "@/config/theme.css";

import { GoogleTagManager } from "@next/third-parties/google";

import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
  metadataBase,
} from "@/constants/app-info";

import { i18n } from "../../../i18n.config";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  metadataBase: new URL(metadataBase),
  alternates: {
    languages: {
      en: "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://nemati.ai",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://nemati.ai/images/common/logo.svg",
        width: 1260,
        height: 800,
        alt: "The logo belongs to Nemati AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://nemati.ai/images/common/logo.svg",
        width: 1260,
        height: 800,
        alt: "The logo belongs to Nemati AI",
      },
    ],
  },
  other: {
    cryptomus: "4588b137",
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://nemati.ai",
      name: `${APP_NAME}`,
      description: `${APP_DESCRIPTION}`,
      publisher: {
        "@type": "Organization",
        name: `${APP_NAME}`,
        logo: {
          "@type": "ImageObject",
          url: "https://nemati.ai/images/common/logo.svg",
          width: 300,
          height: 100,
        },
      },
      alternateName: "Nemati AI",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "(+1) 971 400 2132",
        contactType: "Customer Service",
        areaServed: "US",
        availableLanguage: ["English"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "7343 N Teutonia Ave Milwaukee",
          addressLocality: "Milwaukee",
          addressRegion: "WI",
          postalCode: "53209",
          addressCountry: "US",
        },
      },
    }),
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: true,
};

const dmSansFont = DM_Sans({
  subsets: ["latin", "latin-ext"],
  preload: true,
  weight: ["500"],
});

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html
      className={`${dmSansFont.className} !scroll-smooth  text-large `}
      // @ts-ignore
      foxified=""
      lang={lang || "en"}
    >
      <GoogleTagManager gtmId="GTM-57ZQP7MZ" />
      <body
        suppressHydrationWarning
        className="flex  h-dvh w-[100vw] text-base  justify-center overflow-y-scroll bg-[#07081C]"
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57ZQP7MZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
