import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/zohran-lakdawala-portfolio",
  plugins: [react()], // remove if you're not using react
})
