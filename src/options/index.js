import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import { createApp } from 'vue'
import App from './view/App.vue'
import './index.css'

createApp(App).use(ElementPlus).mount('#app')
