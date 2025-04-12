// import "server-only";
import type { Locale } from "../../i18n.config";

/**
 * An object containing functions to dynamically import JSON dictionaries for various languages.
 * Each function returns a promise that resolves to the default export of the respective JSON module.
 */
const dictionaries = {
  en: () =>
    import("@/config/dictionaries/en.json").then(module => module.default),
  fa: () =>
    import("@/config/dictionaries/fa.json").then(module => module.default),
  ru: () =>
    import("@/config/dictionaries/ru.json").then(module => module.default),
  fr: () =>
    import("@/config/dictionaries/fr.json").then(module => module.default),
  es: () =>
    import("@/config/dictionaries/es.json").then(module => module.default),
  de: () =>
    import("@/config/dictionaries/de.json").then(module => module.default),
  ar: () =>
    import("@/config/dictionaries/ar.json").then(module => module.default),
  hi: () =>
    import("@/config/dictionaries/hi.json").then(module => module.default),
  it: () =>
    import("@/config/dictionaries/it.json").then(module => module.default),
  ja: () =>
    import("@/config/dictionaries/ja.json").then(module => module.default),
  ko: () =>
    import("@/config/dictionaries/ko.json").then(module => module.default),
  pt: () =>
    import("@/config/dictionaries/pt.json").then(module => module.default),
  ku: () =>
    import("@/config/dictionaries/ku.json").then(module => module.default),
  tr: () =>
    import("@/config/dictionaries/tr.json").then(module => module.default),
};

/**
 * An object mapping language codes to their respective text direction.
 * The text direction can be either "ltr" (left-to-right) or "rtl" (right-to-left).
 */
export const langDir = {
  en: "ltr",
  fa: "rtl",
  ar: "rtl",
  ru: "ltr",
  fr: "ltr",
  es: "ltr",
  de: "ltr",
  hi: "ltr",
  it: "ltr",
  ja: "ltr",
  ko: "ltr",
  pt: "ltr",
  ku: "rtl",
  tr: "ltr",
} as const;
/**
 * Asynchronously retrieves the dictionary for the specified locale.
 * If the locale is not found, it defaults to English ("en").
 *
 * @param {Locale} locale - The locale code for which to retrieve the dictionary.
 * @returns Promise<Object> - A promise that resolves to the dictionary object for the specified locale.
 */
export const getDictionary = async (locale: Locale) => {
  if (!Object.keys(dictionaries).includes(locale)) locale = "en";
  return dictionaries[locale as keyof typeof dictionaries]();
};
