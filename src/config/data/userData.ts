import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import loginApi, { loginApiArg, userInfo } from "@/api/main/loginApi";

export class UserData extends BaseData{
  data: Partial<userInfo>
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
    this.data = {}
  }
  login(data: loginApiArg) {
    return new Promise((resolve, reject) => {
      loginApi.require(data).then(res => {
        console.log(res)
        this.data = res.data
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const userData = new UserData({
  prop: 'userData',
})

export default userData
