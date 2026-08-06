import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Increase Vite chunk size warning threshold from default 500 kB to 1600 kB
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Automatically split large node_modules packages into separate cached chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui'
            }
            if (id.includes('react')) {
              return 'vendor-react'
            }
            return 'vendor-libs'
          }
        }
      }
    }
  }
})
