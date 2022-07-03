import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      sourcemap: mode === 'development' ? 'inline' : false,
      minify: false,
      // Use Vite lib mode https://vitejs.dev/guide/build.html#library-mode
      commonjsOptions: {
        ignoreTryCatch: false,
      },
      lib: {
        entry: path.resolve(__dirname, './src/mapForNoteIndex.ts'),
        formats: ['cjs'],
      },
      css: {
        postcss: {
          plugins: [postcssImport, autoprefixer, tailwindcss],
        },
      },
      rollupOptions: {
        output: {
          // Overwrite default Vite output fileName
          entryFileNames: 'main.js',
          assetFileNames: 'styles.css',
        },
        external: ['obsidian'],
      },
      // Use root as the output dir
      emptyOutDir: false,
      outDir: '.',
    },
  };
});
