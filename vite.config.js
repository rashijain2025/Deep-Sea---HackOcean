import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-is', 'recharts', 'leaflet', 'react-leaflet']
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react-core': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-charts': ['recharts', 'react-is'],
          'vendor-map': ['leaflet', 'react-leaflet'],
        }
      }
    },
    chunkSizeWarningLimit: 800
  },
  server: {
    port: 3000,
    open: false
  }
})
