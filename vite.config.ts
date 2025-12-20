import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  // Library build configuration
  if (mode === 'lib') {
    return {
      plugins: [
        dts({
          include: ['src/index.ts', 'src/lib/**/*.ts', 'src/components/**/*.ts', 'src/data/**/*.ts'],
          outDir: 'dist',
          rollupTypes: true,
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'Gralobe',
          fileName: 'gralobe',
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          external: ['three'],
          output: {
            globals: {
              three: 'THREE',
            },
          },
        },
        target: 'esnext',
        minify: 'esbuild',
        sourcemap: true,
      },
    };
  }

  // Development configuration
  return {
    assetsInclude: ['**/*.glsl'],

    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: true,
    },

    server: {
      port: 5173,
      open: true,
    },

    resolve: {
      alias: {
        // Allow importing 'gralobe' in examples to resolve to local source
        'gralobe': resolve(__dirname, 'src/index.ts'),
      },
    },

    optimizeDeps: {
      include: ['three', 'gsap', 'lil-gui'],
    },
  };
});
