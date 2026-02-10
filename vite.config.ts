import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/overdrive_work/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
  },
})
