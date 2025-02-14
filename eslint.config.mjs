import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react";
import security from "eslint-plugin-security";
import importPlugin from "eslint-plugin-import";

export default [
  {
    languageOptions: {
      parser: tsParser,
    },
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
      reactHooks,
      security,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...security.configs.recommended.rules,
      ...importPlugin.configs.warnings.rules,
      ...prettier.configs.recommended.rules,
      "no-unused-expressions": "error",
      "@typescript-eslint/comma-dangle": "off",
      "no-unsafe-optional-chaining": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-key": "error",
      "import/no-duplicates": "off",
      "no-duplicate-imports": "error",
    },
  },
];
