import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
    base: '/',
    build: {
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vant', 'ant-design-vue'],
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
          },
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            },
            resolveComponent: (name) => {
              return `ant-design-vue/lib/${name}`
            }
          },
        ]
      })
    ]
})
