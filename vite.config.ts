import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        track: resolve(import.meta.dirname, "track.html"),
        admin: resolve(import.meta.dirname, "admin.html"),
      },
    },
  },
});
