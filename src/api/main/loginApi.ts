import { responseType } from 'complex-request/src/Rule'
import ApiData from './../class/ApiData'

export type userInfo = {
  id: number
  account: string
  name: string
  avatar?: string
}

export type loginApiArg = {
  account: string
  password: string
}
export type loginApiRes = responseType<{
  data: userInfo
}>

const loginApi = new ApiData<[loginApiArg], loginApiRes>({
  name: '登录',
  url: 'user/common_login',
  token: false,
  api: {
    pre: '',
    service: 'common/user/'
  },
  method: 'post',
  data: ['inherit'],
  mock: {
    trigger: 'force',
    data () {
      return {
        result: 'SUCCEED',
        data: {
          id: 1,
          account: 'account',
          name: 'mock',
          avatar: undefined
        }
      }
    }
  },
})

export default loginApi
