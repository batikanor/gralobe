import { defineConfig } from 'vite';

export default defineConfig({
  // Enable raw imports for shader files
  assetsInclude: ['**/*.glsl'],

  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
  },

  server: {
    port: 3000,
    open: true,
  },

  optimizeDeps: {
    include: ['three', 'gsap', 'lil-gui'],
  },
});
