import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    cacheDir: `node_modules/.vite`,
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        // Externalize all dependencies for Node.js
        external: [
          "ai",
          "@ai-sdk/openai",
          "zod",
          "dotenv",
          "dotenv/config",
          "whoiser",
          "yargs",
          "yargs/helpers",
          /^node:/,
        ],
      },
      target: "node22",
      minify: false,
    },
    resolve: { alias: { src: resolve("src/") } },
    test: {
      globals: true,
      include: ["test/*.test.ts"],
    },
    plugins: [
      // generate typescript types
      dts({
        insertTypesEntry: true,
      }),
    ],
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
