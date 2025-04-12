/**
 * Redirects the path name to the given locale.
 * Add local for multi-language support.
 *
 * @param pathName - The path name to redirect.
 * @param locale - The locale to redirect to.
 */
export const redirectedPathName = (pathName: string, locale: string) => {
  if (!pathName) return "/";
  const segments = pathName.split("/");
  segments[1] = locale;
  return segments.join("/");
};
