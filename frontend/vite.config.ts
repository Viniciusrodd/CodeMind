
// imports
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'


export default defineConfig({
   plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
   ],
   resolve: {
      alias: {
         // images
         '@images': path.resolve(__dirname, 'public/images'),

         // src
         '@assets': path.resolve(__dirname, 'src/assets'),
         '@components': path.resolve(__dirname, 'src/components'),
         '@contexts': path.resolve(__dirname, 'src/contexts'),
         '@pages': path.resolve(__dirname, 'src/pages'),
         '@routes': path.resolve(__dirname, 'src/routes'),
         '@services': path.resolve(__dirname, 'src/services'),

         // styles
         '@styles': path.resolve(__dirname, 'src/styles'),

         // root
         '@root': path.resolve(__dirname, 'src'),
      }
   }
})