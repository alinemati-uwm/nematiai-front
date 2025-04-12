import { useEffect, useState } from "react";

type Child = {
  text: string;
};

type Node = {
  children?: Child[];
  type: string;
};

/**
 * Extracts text from an array of nodes.
 * Used for plate editor.
 *
 * This function traverses through the nodes and extracts text from their children.
 *
 * @param {Node[]} nodes - The array of nodes to extract text from.
 * @returns {string[]} - An array of extracted text strings.
 *
 * @example
 * const nodes = [{ type: "node", children: [{ text: "example text" }] }];
 * const texts = extractText(nodes);
 * console.log(texts); // Output: ["example text"]
 */
const extractText = (nodes: Node[]): string[] => {
  const texts: string[] = [];

  const traverse = (node: Node) => {
    if (node.children) {
      for (const child of node.children) {
        texts.push(child.text);
      }
    }
  };

  nodes.forEach(traverse);
  return texts;
};

/**
 * Checks the validity of a JSON string.
 *
 * This function attempts to parse a JSON string and returns true if it is valid, otherwise false.
 *
 * @param {string} jsonString - The JSON string to validate.
 * @returns {boolean} - True if the JSON string is valid, otherwise false.
 *
 * @example
 * const isValid = isValidJson('{"key": "value"}');
 * console.log(isValid); // Output: true
 */
export const isValidJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

/**
 * Custom hook to extract text from a JSON string.
 *
 * This hook parses the JSON string, extracts text from the nodes, and returns the extracted texts.
 *
 * @param {string} json - The JSON string to extract text from.
 * @returns {string[]} - An array of extracted text strings.
 *
 * @example
 * const json = '[{"type": "node", "children": [{"text": "example text"}]}]';
 * const extractedTexts = useExtractTextFromJson(json);
 * console.log(extractedTexts); // Output: ["example text"]
 */
const useExtractTextFromJson = (json: string): any => {
  //extracted text from history JSON
  const [extractedTexts, setExtractedTexts] = useState<string[]>([]);

  //run the function everytime
  useEffect(() => {
    if (isValidJson(json)) {
      let nodes: Node[] = JSON.parse(json);
      if (typeof nodes === "string") {
        nodes = [nodes];
      }
      const texts = extractText(nodes);
      setExtractedTexts(texts);
    }
  }, [json]);

  return extractedTexts;
};

export default useExtractTextFromJson;
