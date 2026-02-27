import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/civic-sense/' : '/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
}))
