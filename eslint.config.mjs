import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true, // <-- this enables eslint:recommended internally
});

export default [
  ...compat.extends(
    // Don't include eslint:recommended here! It's already included by recommendedConfig:true
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
  ),
];
