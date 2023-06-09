import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
import svgr from "vite-plugin-svgr";

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
