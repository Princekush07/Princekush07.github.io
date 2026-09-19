import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: VITE_BASE_PATH=/Your-Repo-Name/
// User site (username.github.io): leave unset or VITE_BASE_PATH=/
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  plugins: [react()],
  base,
});
