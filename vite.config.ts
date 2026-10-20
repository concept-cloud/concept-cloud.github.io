import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { staticPages } from './scripts/static-pages.ts'

// MARK: Config

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), staticPages()],
  build: {
    target: 'es2022',
    sourcemap: false,
  },
})
