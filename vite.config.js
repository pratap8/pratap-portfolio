import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    // Proxy API requests to Vercel dev server or your local API
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Vercel dev runs on 3000
        changeOrigin: true,
      }
    }
  }
})