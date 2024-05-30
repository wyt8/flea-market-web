// 重置样式
import '@/assets/styles/reset.css'
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
