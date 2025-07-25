import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react"
export default defineConfig({
  plugins: [
    react(),tailwindcss(),
  ],
   server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  hmr: {
    protocol: 'ws',
    host: 'localhost',
  },
  proxy: {
      '/api/v1': 'http://localhost:5000'
    }
}

})

// export default defineConfig({
//   server: {
//     host: 'localhost',
//     port: 5173,
//     strictPort: true,
//   },
// });
