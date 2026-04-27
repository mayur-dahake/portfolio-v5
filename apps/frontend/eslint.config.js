import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  // Node.js config files (vite.config.js, tailwind.config.js, etc.)
  {
    files: ["*.config.{js,cjs,mjs}", "*.config.ts"],
    languageOptions: {
      globals: { ...globals.node }
    }
  },

  // React source files
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    rules: {
      // React 17+ new JSX transform doesn't require React in scope
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^React$|^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],
      // shadcn/ui and context files legitimately export both components and constants
      "react-refresh/only-export-components": "warn"
    }
  }
]);
