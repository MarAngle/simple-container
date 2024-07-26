import { App } from 'vue'
import router from './router/index'
import { initComplex } from './complex/index'
import './router/permission'

export const init = function(app: App) {
  app.use(router)
  initComplex(app)
  return app
}