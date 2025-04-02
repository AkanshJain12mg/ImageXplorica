import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  alias: {
    "@": path.resolve(__dirname, "src"), // This will allow `@` to point to the `src/` directory
  },
})
