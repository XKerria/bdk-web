import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgIcons from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    svgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: {}
    })
  ]
})
