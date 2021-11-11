import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    build: {
      // minify: false
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars:{},
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vant'],
    },
    ssr: {
      external: ['amfe-flexible']
    },
    plugins: [
      vue(),
      vueJsxPlugin(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style`,
            resolveComponent: (name) => {
              return `vant/lib/${name}`
            }
          }
        ]
      })
    ]
})
