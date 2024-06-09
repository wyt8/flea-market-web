// 重置样式
import '@/assets/styles/reset.css'

// 引入模态框组件
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

// 引入轮播图Swiper组件并注册
import { register } from 'swiper/element/bundle'
register()

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 模态框插件
const vfm = createVfm()
app.use(vfm)

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
