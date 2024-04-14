import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import globals from "globals";
import path from "path";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("airbnb-base"),
  {
    files: ["src/**/*.js"],
    ignores: ["**/*.config.js"],
    rules: {
      "jsdoc/require-description": "warn",
    },
    plugins: ["jsdoc"],
  },
];
