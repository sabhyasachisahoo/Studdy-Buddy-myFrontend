// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     tailwindcss(),
//   ],
  
// })

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const __dirname = path.resolve(path.dirname('')); 

export default defineConfig({
  plugins: [tailwindcss(),react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
  
});