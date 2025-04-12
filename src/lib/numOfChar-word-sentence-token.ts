import type { WordType } from "@/services/types";

/**
 * Calculates the number of characters, words, sentences, or tokens in a given string based on the specified type.
 *
 * @param {WordType} type - The type of text content to count. Can be "char", "word", "sentence", or "token".
 * @param {string} value - The string value to analyze.
 * @returns number - The count of the specified type of text content in the given string.
 */
export function numberOfTextContent(type: WordType, value: string) {
  switch (type) {
    case "char": {
      return value.length;
    }
    case "word": {
      return value.split(" ").filter(item => {
        return item.trim() != "";
      }).length;
    }
    case "sentence": {
      return value.split(/\w[.?!]/).filter(item => {
        return item.trim() != "";
      }).length;
    }
    case "token": {
      return 0;
    }
  }
}
