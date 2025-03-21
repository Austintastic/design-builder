import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/design-builder/',
  plugins: [react()],
  logLevel: 'info',
  server: {
    open: true, // Opens browser automatically
  }
})