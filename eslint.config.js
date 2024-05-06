import globals from "globals";

import { composeAbsFilepath } from "./src/utils.js";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";

const __dirname = composeAbsFilepath(".");
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },
  ...compat.extends("airbnb-base"),
  {
    rules: {
      "no-underscore-dangle": [
        "error",
        {
          allow: ["__filename", "__dirname"],
        },
      ],
      "import/extensions": [
        "error",
        {
          js: "always",
        },
      ],
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "no-console": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
];
