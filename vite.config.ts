import { readFileSync } from "node:fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  // Library build configuration
  if (mode === "lib") {
    return {
      plugins: [
        dts({
          include: [
            "src/index.ts",
            "src/lib/**/*.ts",
            "src/components/**/*.ts",
            "src/data/**/*.ts",
          ],
          outDir: "dist",
          rollupTypes: true,
        }),
      ],
      build: {
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "Gralobe",
          fileName: "gralobe",
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: ["three", /^three\/.*/],
          output: {
            globals: {
              three: "THREE",
            },
          },
        },
        target: "esnext",
        minify: "esbuild",
        sourcemap: true,
      },
    };
  }

  // Development configuration
  // Only the hosted demo rewrites its assets. Published library builds above
  // retain portable upstream defaults for applications that consume Gralobe.
  const manifest = JSON.parse(
    readFileSync(resolve(__dirname, "public/vendor/manifest.json"), "utf8"),
  ) as { files: { replacementUrl?: string; publicUrl?: string }[] };
  const replacements = manifest.files.filter(
    (file): file is { replacementUrl: string; publicUrl: string } =>
      Boolean(file.replacementUrl && file.publicUrl),
  );

  return {
    plugins:
      mode === "test"
        ? []
        : [
            {
              name: "self-hosted-demo-assets",
              enforce: "pre" as const,
              transform(source: string, id: string) {
                if (!id.includes("/src/") || !/\.[jt]s(?:\?|$)/.test(id)) return;
                let code = source;
                for (const { replacementUrl, publicUrl } of replacements) {
                  code = code.replaceAll(replacementUrl, publicUrl);
                }
                return code === source ? undefined : { code, map: null };
              },
            },
          ],
    assetsInclude: ["**/*.glsl"],

    build: {
      target: "esnext",
      minify: "esbuild",
      sourcemap: true,
    },

    server: {
      port: 5173,
      open: true,
    },

    resolve: {
      alias: {
        // Allow importing 'gralobe' in examples to resolve to local source
        gralobe: resolve(__dirname, "src/index.ts"),
      },
    },

    optimizeDeps: {
      include: ["three", "gsap", "lil-gui"],
    },
  };
});
