import './assets/main.css'
import './assets/fonts/stylesheet.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva';
import { runDev } from './tools/indexGetter'

const app = createApp(App)
runDev.value="vite"
app.use(ElementPlus);
app.use(createPinia())
app.use(router)
app.use(VueKonva);
app.mount('#app')
