// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import cssModules from "eslint-plugin-css-modules";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,

  {
    plugins: {
      "css-modules": cssModules,
    },
    rules: {
      "css-modules/no-undef-class": "error",
      "css-modules/no-unused-class": "warn",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);