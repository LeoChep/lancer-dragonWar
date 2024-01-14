import { fileURLToPath, URL } from 'node:url'
import {func} from './extracServer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePluginNode } from 'vite-plugin-node';
// https://vitejs.dev/config/
export default defineConfig(()=>{
  func()
  return{
    build: {
      // 在 outDir 中生成 .vite/manifest.json
      manifest: true,
    },
    server: {
      //使用IP能访问
        host: '0.0.0.0'
      },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
