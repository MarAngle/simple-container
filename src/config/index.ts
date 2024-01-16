import { App } from 'vue'
import router from './router/index'
import './router/permission'

export const init = function(app: App) {
  app.use(router)

  return app
}