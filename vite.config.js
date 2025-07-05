// Import Vite's configuration helper
import { defineConfig } from "vite";

// Plugin to enable React support: JSX, Fast Refresh, etc.
import react from "@vitejs/plugin-react";

// Plugin to integrate Tailwind CSS with Vite
import tailwindcss from "@tailwindcss/vite";

// Plugin that allows importing SVGs as React components
import svgr from "@svgr/rollup";

// Node.js module to resolve file paths
import path from "path";

// Export the Vite configuration using defineConfig for better IntelliSense and type safety
export default defineConfig({
  // Register all Vite plugins here
  plugins: [
    react(),         // Enables React features like JSX, HMR, and Fast Refresh
    tailwindcss(),   // Enables Tailwind CSS support via PostCSS
    svgr(),          // Allows SVGs to be imported and used as React components import { ReactComponent as Logo } from './logo.svg';
  ],

  // Customize how modules are resolved
  resolve: {
    alias: {
      // Allows you to import from '@components/Button' instead of relative paths like '../../components/Button'
      "@components": path.resolve(__dirname, "src/components"),

      // Allows importing assets like images, SVGs from '@assets/...'
      "@assets": path.resolve(__dirname, "src/assets"),

      // Create an alias for utility functions or helper code
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },

  // Configure development server behavior
  server: {
    open: true,   // Automatically opens your app in the default browser on startup
    port: 3000,   // Runs the dev server on http://localhost:3000 instead of the default (5173)
  },

  // Define global constants or environment shims available throughout the app
  define: {
    // Ensures compatibility with libraries that use `global` (e.g., Node polyfills)
    global: "globalThis",

    // Provides a basic fallback for `import.meta.env` to avoid runtime errors in some tools
    "import.meta.env": {},
  },

  // Customize the build process (used when running `vite build`)
  build: {
    rollupOptions: {
      output: {
        // Format for main entry files, includes a content hash for cache busting
        entryFileNames: "[name].[hash].js",

        // Format for dynamically imported chunks
        chunkFileNames: "[name].[hash].js",

        // Format for static assets like images, fonts, etc.
        assetFileNames: "[name].[hash].[ext]",
      },
    },
  },
});
