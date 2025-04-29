import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // your existing Next.js / TS presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // now turn off `no-var` in all .d.ts files
  {
    files: ["**/*.d.ts"],
    rules: {
      "no-var": "off",
    },
  },
];
