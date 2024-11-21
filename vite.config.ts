import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/Personal-Library-Manager/",
  server: {
    open: true, // Automatically opens the browser when the server starts
    port: 3000, // Set the development server port
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Shortcut for importing from the src folder
    },
  },
  test: {
    globals: true, // Enable globals like `describe`, `it`
    environment: "jsdom", // Simulate a browser environment
    setupFiles: './src/setupTests.ts', // Optional: Add a setup file for initializing globals
  },
} as any);
