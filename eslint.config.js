import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    // Apply configuration to all JavaScript-related files
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    // Global language options, including browser globals
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser, // Add browser globals
    },
    // Ignore directories as specified
    ignores: [
      "node_modules",
      "dist",
      "/build",
      "/.github",
      "/editor",
      "/public",
    ],
  },
  // Apply the base recommended config from ESLint
  pluginJs.configs.recommended,
  // Apply the recommended config for React
  pluginReact.configs.flat.recommended,
  {
    // Apply custom rules
    rules: {
      "max-len": ["error", 300],
      "linebreak-style": "off",
      "require-jsdoc": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "object-curly-spacing": "off",
      "comma-dangle": "off",
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "no-unused-vars": "off",
      "camelcase": "off",
      "no-undef": "off",
      "no-useless-escape": "off",
      "no-empty": "off",

    },
    // React-specific settings
    settings: {
      react: {
        createClass: "createReactClass",
        pragma: "React",
        fragment: "Fragment",
        version: "detect", // Automatically detect React version
        flowVersion: "0.53", // Flow version if using Flow
      },
    },
  },
  {
    // Overrides for specific files (like .eslintrc.js files)
    files: [".eslintrc.{js,cjs}"],
    languageOptions: {
      sourceType: "script",
      globals: globals.node, // Add node-specific globals
    },
  },
];

// How npm run lint:fix fixed your files?
// When you ran:
// npm run lint:fix
// ESLint did this:
// Auto-fixed all rules that are fixable like:
// "quotes": ["error", "double"] → converted ' to "
// "indent": ["error", 2] → adjusted indentation
// Removed unnecessary spaces, semicolons, etc. where rules supported it
// ➡️ These are called auto-fixable rules. ESLint fixed them silently.