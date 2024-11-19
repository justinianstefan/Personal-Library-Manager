import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically opens the browser when the server starts
    port: 3000, // Set the development server port
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Shortcut for importing from the src folder
    },
  },
  test: {
    globals: true, // Enables global APIs like `describe`, `it`, etc.
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './src/setupTests.ts', // Setup file for test utilities
    css: true, // Enables CSS imports in tests
  },
});