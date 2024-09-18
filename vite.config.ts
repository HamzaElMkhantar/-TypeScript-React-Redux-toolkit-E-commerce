import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname,"src/assets"),
      "@components": path.resolve(__dirname,"src/components"),
      "@hooks": path.resolve(__dirname,"src/hooks"),
      "@layouts": path.resolve(__dirname,"src/layouts"),
      "@pages": path.resolve(__dirname,"src/pages"),
      "@routes": path.resolve(__dirname,"src/routes"),
      "@services": path.resolve(__dirname,"src/services"),
      "@store": path.resolve(__dirname,"src/store"),
      "@styles": path.resolve(__dirname,"src/styles"),
      "@utils": path.resolve(__dirname,"src/utils"),
      "@api": path.resolve(__dirname,"src/api"),
      "@customTypes": path.resolve(__dirname,"src/types"),
      "@validations": path.resolve(__dirname,"src/validations/index"),
    }
  },
  plugins: [react(), svgr()],
})
