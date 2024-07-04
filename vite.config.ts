import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  base: '/',
})
