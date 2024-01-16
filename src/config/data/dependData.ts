import { reactive } from "vue"
import menuData from "./menuData"

const dependData = reactive({
  load: 'un',
  loadData() {
    return new Promise((resolve, reject) => {
      this.load = 'ing'
      menuData.loadData(true).then(res => {
        this.load = 'success'
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})

export default dependData