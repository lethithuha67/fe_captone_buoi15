import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Base path cho router
  server: {
    proxy: {
      '/user': {
        target: 'http://14.225.204.233:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, '/user'),
      },
      '/image': {
        target: 'http://14.225.204.233:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image/, '/image'),
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ],
    },
  },
  build: {
    outDir: 'dist',
  },
})
