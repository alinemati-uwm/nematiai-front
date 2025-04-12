/** @type {import("prettier").Config} */
export default {
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "^react$", // React imports
    "^next$", // Next.js imports
    "", // Empty line
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    "^@/components(/.*)$", // Components
    "^@/hooks(/.*)$",
    "^@/lib(/.*)$",
    "^@/stores(/.*)$",
    "^@/constants(/.*)$",
    "^@/(.*)$",
    "",
    "^[./]",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  tailwindFunctions: ["cn", "cva"],
};
