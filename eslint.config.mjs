// .eslintrc.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    rules: {
      // Prettier 관련
      "prettier/prettier": "error",
      // unused-vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      // explicit returns
      "@typescript-eslint/explicit-function-return-type": ["warn"],
      // no any
      "@typescript-eslint/no-explicit-any": ["error"],
      // React-specific
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      // 모든 JSX prop 값을 중괄호로 감싸도록 강제
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "always", children: "never" },
      ],
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
