export const appLocales = [
  "en",
  // "fa",
  // "ru",
  // "fr",
  // "es",
  // "hi",
  // "ar",
  // "de",
  // "it",
  // "ja",
  // "ko",
  // "pt",
  // "ku",
  // "tr",
];
export const i18n = {
  defaultLocale: "en",
  locales: appLocales,
} as const;

export type Locale = (typeof i18n)["locales"][number];
