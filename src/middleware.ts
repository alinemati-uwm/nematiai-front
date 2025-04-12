import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "../i18n.config";
import useCategoryModel from "./hooks/category/model";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return (
    matchLocale(
      languages && languages[0] === "*" ? ["en-US", "en"] : languages,
      locales,
      i18n.defaultLocale,
    ) || i18n.defaultLocale
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.search(".txt") > 0 || pathname.search(".xml") > 0) return;
  const searchParams = request.nextUrl.searchParams.toString();
  const locale = getLocale(request);
  const routesDashboard: any = useCategoryModel.flattenMenu.map(el => el.route);
  const isDashboardRoute = routesDashboard.includes(pathname);
  const isMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  const langCookie = request.cookies.get("lang")?.value;

  if (isMissingLocale && !langCookie && !isDashboardRoute) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${url.pathname}`;
    return NextResponse.rewrite(url);
  } else if (isMissingLocale && (langCookie || isDashboardRoute)) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}?${searchParams}`,
        request.url,
      ),
    );
  } else {
    const response = NextResponse.next();
    if (!isMissingLocale) response.cookies.set("lang", locale ?? "en");
    return response;
  }
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, و مسیرهای manifest.json و پوشه .well-known
  matcher: [
    "/((?!api|_next/static|_next/image|_next/pdf|favicon.ico|public/|images|pdf|testMusic|.well-known/*|audios/*|manifest.json).*)",
  ],
};
