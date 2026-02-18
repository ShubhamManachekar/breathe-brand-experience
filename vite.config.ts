import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-core": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-tooltip", "@radix-ui/react-toast", "@radix-ui/react-dialog", "@radix-ui/react-slot"],
          vendor: ["@tanstack/react-query", "@supabase/supabase-js"],
        },
      },
    },
  },
}));
