import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
//  root: 'frontend' ,
  resolve:{ alias: {'@':'frontend'} },
  build: {outDir:'build'},
  plugins: [react()],
  server:{
    host:"0.0.0.0",
    port:5173,
    proxy: {
      // Usa el prefijo '/api' para las rutas
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true, 
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
