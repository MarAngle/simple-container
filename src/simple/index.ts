import { reactive } from 'vue'
import { setEnv } from 'complex-utils'
import { Data } from 'complex-data'

setEnv(process.env.NODE_ENV)
setEnv(process.env.NODE_ENV, 'real')

Data.$format = function(data) {
  return reactive(data)
}
