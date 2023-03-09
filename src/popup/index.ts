import {createPinia} from 'pinia'
import {createApp} from 'vue'
import "~/styles/index.scss"
// @ts-ignore
import App from './App.vue'
import 'uno.css'

createApp(App).use(createPinia()).mount('#app')
