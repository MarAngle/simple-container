import { reactive } from "vue"

const dependData = reactive({
  load: 'un',
  loadData() {
    return new Promise((resolve) => {
      this.load = 'ing'
      setTimeout(() => {
        this.load = 'success'
        resolve({})
      }, 500)
    })
  }
})

export default dependData