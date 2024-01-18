import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import userData from "./userData";
import { loginApiArg } from "@/api/main/loginApi";

export class LoginData extends BaseData{
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
  }
}

const loginData = new LoginData({
  prop: 'loginData',
  getData(data) {
    return userData.login(data as loginApiArg)
  }
})

export default loginData
