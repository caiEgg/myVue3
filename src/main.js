import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//引入封装Axios请求
import Axios from './request/axios.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import testItem from '@/components/testItem.vue'
import { createPinia } from 'pinia'
import {setRoutes} from '@/router/index.js'
const pinia = createPinia()

const app = createApp(App).use(Axios).use(pinia)
setRoutes()

app.use(router)
app.component('testItem', testItem)
app.mount('#app')
app.use(ElementPlus)
