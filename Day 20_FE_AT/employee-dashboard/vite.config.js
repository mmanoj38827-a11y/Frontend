import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // 👈 Itha kandippa add pannanum
    environment: 'jsdom', // 👈 React components test panrathukku ithu mukkiyam
  },
})