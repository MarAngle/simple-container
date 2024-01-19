import loginApi, { loginApiArg, userInfo } from "@/api/main/loginApi";
import { getLocalData, setLocalData } from "complex-utils";
import { reactive } from "vue";

const localKey = 'userInfo'

export class UserData{
  load: 'un' | 'ing' | 'success'
  data: Partial<userInfo>
  constructor() {
    const localData = getLocalData(localKey)
    if (localData) {
      this.data = localData
      this.load = 'success'
    } else {
      this.data = {}
      this.load = 'un'
    }
  }
  login(data: loginApiArg) {
    return new Promise((resolve, reject) => {
      this.load = 'ing'
      loginApi.require(data).then(res => {
        this.setData(res.data.data)
        this.load = 'success'
        resolve(res)
      }).catch(err => {
        this.load = 'un'
        reject(err)
      })
    })
  }
  setData(data?: userInfo) {
    this.data = data || {}
    setLocalData(localKey, data)
  }
}

const userData = reactive(new UserData())

export default userData
