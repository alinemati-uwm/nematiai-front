import { type Value } from "@udecode/slate";
import { clsx, type ClassValue } from "clsx";
import { type Node } from "slate";
import { twMerge } from "tailwind-merge";

import { languages } from "@/components/shared/grammar_translate_rewrite/component/form-section-components/contants";

/**
 * This function generates a range of numbers from the start value to the end value (inclusive).
 * It uses the Array from method to create an array with a length equal to the difference between the end and start values plus 1.
 * The second argument to Array from is a map function that returns the current index, effectively filling the array with numbers from 0 to the length of the array.
 * The result is an array of numbers from the start value to the end value.
 *
 * @param {number} start - The start value of the range.
 * @param {number} end - The end value of the range.
 * @returns {number[]} An array of numbers from the start value to the end value.
 */
export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i);
}

/**
 * This function merges a list of class names into a single string.
 * It uses the clsx library to combine the class names, and then uses the tailwind-merge library to merge the resulting class names.
 * The function takes a rest parameter, allowing for any number of arguments to be passed.
 *
 * @param {...ClassValue[]} inputs - The class names to be merged.
 * @returns string The merged class names as a single string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * for get first letter of name and lastname
 * @param word
 * @return char first char of word passed to uppercase
 */
export const getFirstLetter = (word: string) => {
  return word ? word[0].toUpperCase() : "A";
};

/**
 * pass variable and get hsl
 * @param variable color variable from global css
 */
export const getHslColorByVar = (variable: string) => {
  return `hsl(var(${variable}))`;
};

/**
 * This function separates a number by commas for every three digits from the right.
 * It takes a string as an input, removes any existing commas, and splits the string at the decimal point.
 * The integer part of the number is then separated by commas for every three digits from the right.
 * The function then returns the formatted number as a string.
 * If the input is null, the function returns 0.
 *
 * @param {string} number - The number to be formatted, represented as a string.
 * @returns string The formatted number as a string, or 0 if the input is null.
 */
export function separateNumber(number: string) {
  if (number != null) {
    number += "";
    number = number.replace(",", "");
    const x = number.split(".");
    let y = x[0];
    const z = x.length > 1 ? "." + x[1] : "";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  } else {
    return "0";
  }
}

export const getLangById = (id: string) =>
  languages.find(item => item.id.toLowerCase() === id.toLowerCase());

export const isBrowser = () => typeof window !== "undefined";

/**
 * Checks if the provided value is of a valid type.
 *
 * This function verifies if the provided value is not null and attempts to extract text from it.
 * If the extraction is successful, it returns true, otherwise false
 * Used for plate editor.
 *
 * @param {Value | null} value - The value to be checked.
 * @returns {boolean} - True if the value is valid, false otherwise.
 */
export const CheckTypeValue = (value: Value | null): boolean => {
  // Check if the value is null
  if (value === null) {
    return false;
  }
  try {
    const checkIsValid = true;

    // Extract text from the Node
    const extractText = (nodes: Node[], seperate: string = "") => {
      for (const node of nodes) {
        if ("children" in node) {
          return extractText(node.children, seperate);
        }
      }
    };

    extractText(value, "");

    return checkIsValid;
  } catch (error) {
    return false;
  }
};

/**
 * Extracts text from a plate editor value with optional spacing.
 *
 * This function extracts text from the provided value, optionally adding line breaks or spaces between elements.
 *
 * @param {Value | null} value - The value to extract text from - Plate editor value.
 * @param {boolean} [enterLine=false] - Whether to add line breaks between elements.
 * @returns {string} - The extracted text with optional spacing.
 */
export const extractTextWithSpacing = (
  value: Value | null,
  enterLine: boolean = false,
): string => {
  if (value === null) {
    return "";
  }

  let text = "";

  const seperaterValue = enterLine ? "\n" : " ";

  const extractText = (nodes: Node[], seperate: string = "") => {
    for (const node of nodes) {
      // Check if the node has text
      // If it does, add it to the text string
      if ("text" in node) {
        text += node.text + seperate;
      }

      if ("children" in node) {
        if ("type" in node) {
          // Check if the node is a paragraph or table row
          switch (node.type) {
            case "p":
            case "tr": {
              seperate = seperaterValue;
              break;
            }
            case "td": {
              seperate = " ";
              break;
            }
            default: {
              seperate = "";
            }
          }
        } else {
          seperate = "";
        }

        extractText(node.children, seperate);
      }
    }
  };

  extractText(value, "");

  return text.trim();
};

/**
 * Gets the file address as a URL.
 *
 * This function creates a URL for the provided file using the URL.createObjectURL method.
 *
 * @param {File} file - The file to get the address for.
 * @returns string | null - The URL of the file, or null if the file is not provided.
 */
export const getFileAddress = (file: File) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

/**
 * Loads an image from a file.
 *
 * This function reads the provided file as a data URL and creates an HTMLImageElement from it.
 *
 * @param {File} file - The file to load the image from.
 * @returns Promise<HTMLImageElement> - A promise that resolves to the loaded image element.
 */
export const loadImage = (file: File) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    try {
      // Create a new FileReader
      const reader = new FileReader();
      reader.onload = () => {
        const img: HTMLImageElement = new Image();
        // Set the image source to the data URL
        img.src = reader.result as string;
        img.onload = () => {
          resolve(img);
        };
      };
      // Read the file as a data URL
      if (file) reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generates a random key.
 *
 * This function generates a random key using the current timestamp and a random string.
 *
 * @returns string - The generated random key.
 */
export const generateRandomKey = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Capitalizes the first letter of a string.
 *
 * This function takes a string and returns it with the first letter capitalized.
 *
 * @param {string} val - The string to capitalize.
 * @returns string - The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/**
 * Checks if the current device is a mobile device.
 *
 * This function checks the user agent string to determine if the current device is a mobile device.
 *
 * @returns boolean - True if the current device is a mobile device, false otherwise.
 */
export const checkIsMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|iemobile/i.test(
    userAgent,
  );
};
