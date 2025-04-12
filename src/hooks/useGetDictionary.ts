"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { getDictionary } from "@/lib/dictionary";
import defaultLang from "@/config/dictionaries/en.json";

import type { Locale } from "../../i18n.config";

/**
 * Custom hook to fetch and manage the dictionary based on the current language.
 *
 * This hook uses the Next.js `useParams` to get the current language and fetches the corresponding dictionary.
 * It sets the dictionary state with the fetched data.
 *
 * @returns Object- The dictionary object for the current language.
 *
 * @example
 * // Usage of useGetDictionary hook
 * const dictionary = useGetDictionary();
 * console.log(dictionary);
 */
export function useGetDictionary() {
  const { lang } = useParams();
  const [dictionary, setDictionary] = useState(defaultLang);
  useEffect(() => {
    const fetchDictionary = async () =>
      //@ts-ignore
      setDictionary(await getDictionary(lang as Locale));

    fetchDictionary();
  }, [lang]);

  return dictionary;
}
