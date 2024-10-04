import {createApp} from 'vue'
import '~/styles/index.scss'
// @ts-ignore
import App from './App.vue'
import 'uno.css'
import {createPinia} from 'pinia'

createApp(App).use(createPinia()).mount('#app')
