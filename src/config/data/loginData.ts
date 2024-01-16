import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import menuData from "./menuData";

class LoginData extends BaseData{
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
  }
}

const loginData = new LoginData({
  prop: 'loginData',
  getData() {
    return new Promise((resolve, reject) => {
      console.log(1)
      setTimeout(() => {
        resolve({})
      }, 200)
    })
  }
})

export default loginData
