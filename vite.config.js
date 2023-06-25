import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
})
