import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'
import { init } from './config'

const app = createApp(App).use(Antd)

init(app).mount('#app')
