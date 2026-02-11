import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/overdrive_work/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
