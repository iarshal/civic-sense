import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/civic-sense/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
