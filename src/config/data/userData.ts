import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import loginApi, { loginApiArg } from "@/api/main/loginApi";

export class UserData extends BaseData{
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
  }
  login(data: loginApiArg) {
    return new Promise((resolve, reject) => {
      loginApi.require(data).then(res => {
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
