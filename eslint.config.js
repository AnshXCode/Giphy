// Import predefined sets of global variables for different environments (browser, node, etc.)
import globals from "globals";

// Import the official ESLint plugin for JavaScript base rules
import pluginJs from "@eslint/js";

// Import the ESLint plugin for React-specific rules
import pluginReact from "eslint-plugin-react";

export default [

  {
    // ✅ Apply ESLint rules only to these JavaScript file types
    files: ["**/*.{js,mjs,cjs,jsx}"], // Targets all JS and JSX files in all folders
  },

  {
    // ✅ Set global language options for linting
    languageOptions: {
      ecmaVersion: "latest", // Support the latest ECMAScript features
      sourceType: "module", // Treat files as ES Modules
      globals: globals.browser, // Define browser-specific global variables (e.g., window, document)
    },

    // ✅ Ignore files and folders from being linted
    ignores: [
      "node_modules", // Dependencies folder
      "dist", // Build output
      "/build", // Optional custom build folder
      "/.github", // GitHub config files
      "/editor", // Any editor-related code (optional)
      "/public", // Static public assets
    ],
  },

  // ✅ Apply the default recommended ESLint rules for JavaScript
  pluginJs.configs.recommended,

  // ✅ Apply the official React plugin's recommended rules (Flat Config version)
  pluginReact.configs.flat.recommended,

  {
    // ✅ Customize ESLint rules to match your team's coding style
    rules: {
      // Enforce a very long line limit before erroring (can be adjusted)
      "max-len": ["error", 300],

      // Turn off rule that enforces Unix-style line endings
      "linebreak-style": "off",

      // Turn off rule that requires documentation (JSDoc)
      "require-jsdoc": "off",

      // Disable React prop-types checking (you might be using TypeScript instead)
      "react/prop-types": "off",

      // Turn off React import requirement for JSX (not needed in React 17+)
      "react/react-in-jsx-scope": "off",

      // Disable spacing rule for curly braces
      "object-curly-spacing": "off",

      // Turn off trailing comma requirement
      "comma-dangle": "off",

      // Enforce use of double quotes for strings
      "quotes": ["error", "double"],

      // Enforce 2-space indentation
      "indent": ["error", 2],

      // Disable unused variable checking (use with caution)
      "no-unused-vars": "off",

      // Disable camelCase enforcement (can be useful in backend code or APIs)
      "camelcase": "off",

      // Turn off undefined variable error (used cautiously)
      "no-undef": "off",

      // Turn off escaping rules (for regex etc.)
      "no-useless-escape": "off",

      // Allow empty code blocks
      "no-empty": "off",


      // ✅ Add these
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "space-in-parens": ["error", "never"],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", "never"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "block-spacing": ["error", "always"],
      "no-multi-spaces": "error"
    },

    // ✅ React-specific configuration settings
    settings: {
      react: {
        createClass: "createReactClass", // For older React apps using createReactClass()
        pragma: "React", // The default JSX pragma
        fragment: "Fragment", // Fragment shorthand syntax support
        version: "detect", // Auto-detect React version from your project
        flowVersion: "0.53", // Flow version (if Flow is used instead of TypeScript)
      },
    },
  },

  {
    // ✅ Apply specific overrides for your ESLint config files themselves
    files: [".eslintrc.{js,cjs}"], // Targets ESLint config files

    languageOptions: {
      sourceType: "script", // Treated as traditional script files (not modules)
      globals: globals.node, // Enable Node.js global variables like `__dirname`, `require`, etc.
    },
  },
];

// 🔧 How npm run lint:fix Worked
// When you ran:
// npm run lint:fix
// ESLint used the rules in this file and auto-fixed all issues that were auto-fixable.

// ⚡ What ESLint Auto-Fixed:
// Rule	Example Change
// "quotes": ["error", "double"]	'Hello' → "Hello"
// "indent": ["error", 2]	Adjusted spacing to 2 spaces
// "comma-dangle": "off"	Removed or left trailing commas as-is
// "react/react-in-jsx-scope": "off"	Removed unnecessary import React lines
// object-curly-spacing, no-useless-escape	Cleaned formatting

// ➡️ ESLint silently fixed these using the --fix flag behind the scenes.