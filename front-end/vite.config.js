import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 ADD THIS LINE

  build: {
    outDir: "dist", // This should match Vercel's default static file folder
  },
});

// import { defineConfig } from 'vite';
// import htmlMinifier from 'vite-plugin-html-minifier-terser';

// export default defineConfig({
//   plugins: [
//     htmlMinifier({
//       minifyCSS: true, // Minify CSS inside HTML
//       minifyJS: true,  // Minify JS inside HTML
//       removeComments: true, // Remove comments
//       collapseWhitespace: true, // Remove unnecessary whitespace
//     }),
//   ],
// });

// export default defineConfig({
//   build: {
//     minify: 'terser', // Use Terser for JS minification (optional, default is esbuild)
//     terserOptions: {
//       compress: {
//         drop_console: true, // Optionally remove console.log calls from production code
//       },
//     },
//   },
// });

// import { defineConfig } from 'vite';
// import imagemin from 'vite-plugin-imagemin';

// export default defineConfig({
//   plugins: [
//     imagemin({
//       gifsicle: { optimizationLevel: 3 },
//       jpegoptim: { progressive: true },
//       optipng: { optimizationLevel: 7 },
//       svgo: { plugins: [{ removeViewBox: false }] },
//     }),
//   ],
// });

// import { defineConfig } from 'vite';
// import compress from 'vite-plugin-compress';

// export default defineConfig({
//   plugins: [compress({ brotli: true })], // Enable Brotli compression
// });

// import { defineConfig } from 'vite';
// import { visualizer } from 'vite-plugin-bundle-analyzer';

// export default defineConfig({
//   plugins: [visualizer()],
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import htmlMinifier from 'vite-plugin-html-minifier-terser';
// import imagemin from 'vite-plugin-imagemin';
// import compress from 'vite-plugin-compress';
// import { visualizer } from 'vite-plugin-bundle-analyzer';

// export default defineConfig({
//   plugins: [
//     // React plugin for JSX/TSX support
//     react(),

//     // HTML minification plugin to minify HTML files in production
//     htmlMinifier({
//       minifyCSS: true, // Minify CSS inside HTML
//       minifyJS: true,  // Minify JS inside HTML
//       removeComments: true, // Remove comments
//       collapseWhitespace: true, // Remove unnecessary whitespace
//     }),

//     // Image optimization plugin to optimize images during the build
//     imagemin({
//       gifsicle: { optimizationLevel: 3 },
//       jpegoptim: { progressive: true },
//       optipng: { optimizationLevel: 7 },
//       svgo: { plugins: [{ removeViewBox: false }] },
//     }),

//     // Compression plugin for Brotli and Gzip compression
//     compress({
//       brotli: true, // Enable Brotli compression
//       gzip: true,   // Optionally enable Gzip compression
//     }),

//     // Bundle analyzer plugin to analyze your bundle size
//     visualizer({
//       open: true, // Open the report in the browser automatically
//       filename: './dist/stats.html', // Output the bundle analysis report to a file
//     }),
//   ],

//   build: {
//     outDir: 'dist', // Vercel's default static file folder

//     // Minify JS using Terser (optional, Vite defaults to esbuild)
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true, // Optionally remove console.log calls in production
//       },
//     },

//     // Enable CSS code splitting (so CSS is split into separate files)
//     cssCodeSplit: true,

//     // Disable source maps in production (optional)
//     sourcemap: false,
//   },

//   // Optionally, define server settings (e.g., to serve compressed assets)
//   server: {
//     open: true, // Open the browser automatically when the server starts
//     proxy: {
//       '/api': 'http://localhost:5000', // Example API proxy configuration (if needed)
//     },
//   },
// });
