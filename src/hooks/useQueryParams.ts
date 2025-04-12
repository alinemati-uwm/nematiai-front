import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook to manage query parameters in the URL.
 *
 * This hook provides functions to add, replace, and remove query parameters
 * in the URL without causing a re-render, as well as using the Next.js router.
 *
 * @returns Object - An object containing functions to manipulate query parameters and the current query parameters.
 */
export function useQueryParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Adds or replaces query parameters in the current URL.
   *
   * @param {Record<string, string>} query - The query parameters to add or replace.
   * @param {string[]} [removeQuery=[]] - The query parameters to remove.
   * @returns Record<string, string> - The updated query parameters.
   */
  const addOrReplaceQuery = (
    query: Record<string, string>,
    removeQuery: string[] = [],
  ) => {
    // Convert the searchParams object to a plain object
    const listQuery = Object.fromEntries(searchParams.entries());

    // Remove the query parameters specified in the removeQuery array
    removeQuery.map(item => {
      if (listQuery[item]) {
        delete listQuery[item];
      }
    });

    for (const key in query) {
      listQuery[key] = query[key];
    }

    return listQuery;
  };

  /**
   * Converts an object to a query string.
   *
   * @param {Object} params - The parameters for the function.
   * @param {Record<string, any>} params.obj - The object to convert to a query string.
   * @param {string[]} [params.removeQuery=[]] - The query parameters to remove.
   * @returns string - The query string.
   */
  const objectToQueryString = ({
    obj,
    removeQuery = [],
  }: {
    obj: Record<string, any>;
    removeQuery?: string[];
  }): string => {
    // Convert the object to an array of key-value pairs
    return Object.entries(addOrReplaceQuery(obj, removeQuery))
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&"); // Join the key-value pairs with an ampersand
  };

  /**
   * Sets query parameters in the URL without causing a re-render.
   * Use browser history to replace the current URL with the new URL.
   *
   * @param {Record<string, string>} query - The query parameters to set.
   * @param {string[]} [removeQuery=[]] - The query parameters to remove.
   */
  const setQueryWithoutReRender = (
    query: Record<string, string>,
    removeQuery: string[] = [],
  ) => {
    const newUrl =
      `${pathname}?` + objectToQueryString({ obj: query, removeQuery });
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl,
    );
  };

  /**
   * Sets query parameters in the URL using the Next.js router.
   *
   * @param {Record<string, string>} query - The query parameters to set.
   * @param {string[]} [removeQuery=[]] - The query parameters to remove.
   */
  const setQueryByRouter = (
    query: Record<string, string>,
    removeQuery: string[] = [],
  ) => {
    const newUrl =
      `${pathname}?` + objectToQueryString({ obj: query, removeQuery });
    router.push(newUrl);
  };

  /**
   * Reloads the current page with the existing query parameters.
   */
  const reloadPage = () => {
    const newUrl = `${pathname}?app=${Object.fromEntries(searchParams.entries()).app}`;

    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl,
    );
  };

  return {
    reloadPage,
    setQueryWithoutReRender,
    setQueryByRouter,
    queries: Object.fromEntries(searchParams.entries()),
  };
}
