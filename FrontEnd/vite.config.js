import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  root: './', // Configura la raíz del proyecto
  build: {
    outDir: 'dist', // Define el directorio de salida para la compilación
    rollupOptions: {
      input: 'index.html' // Asegura que Vite use el index.html correcto
    }
  }
};