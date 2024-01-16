import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import request from "../request";

class LoginData extends BaseData{
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
  }
}

const loginData = new LoginData({
  prop: 'loginData',
  getData() {
    return new Promise((resolve, reject) => {
      request.request({

      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})

export default loginData
