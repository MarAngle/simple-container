import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './simple/index'
import { initStyle } from './modules/complex-component-antd/index'

initStyle()

const app = createApp(App)

app.use(Antd).use(router).mount('#app')
