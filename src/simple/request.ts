import { responseType } from "@/modules/complex-request/src/Rule";
import { AxiosRequest } from "complex-request-axios";

const currentUrl = 'https://gateway-test.wuzheng.com.cn/'

const request = new AxiosRequest({
  baseUrl: currentUrl,
  rule: [
    {
      prop: 'default',
      token: {
        data: {
          sign: {
            require: true,
            location: 'params',
            value: 'sign'
          },
          timestamp: {
            require: true,
            location: 'params',
            getValue: function () {
              return Date.now()
            }
          },
          Authorization: {
            require: true,
            location: 'header'
          },
          'X-Token-Issuer': {
            require: true,
            location: 'header',
            value: 'common-console'
          },
          'X-Request-Id': {
            require: true,
            location: 'header',
            getValue: function () {
              return Date.now()
            }
          }
        }
      },
      check (url: string) {
        if (url.indexOf(currentUrl) > -1) {
          return true
        } else {
          return false
        }
      },
      login() {
        return Promise.reject({ status: 'fail' })
      },
      refresh() {
        return Promise.reject({ status: 'fail' })
      },
      format (response: any) {
        const res: responseType = {
          status: 'fail'
        } as responseType
        if (response.data) {
          res.data = response.data
          if (response.data.result === 'SUCCEED') {
            res.status = 'success'
            res.msg = response.data.errorMessage
          } else if (response.data.errorCode === '000031' || response.data.errorCode === '000032') {
            res.status = 'login'
            res.code = response.data.errorCode
            res.msg = response.data.errorMessage
          } else if (response.data.errorCode === 'N1000' || response.data.errorCode === 'N1009') {
            res.status = 'login'
            res.code = response.data.errorCode
            res.msg = response.data.errorMessage
          } else {
            res.code = response.data.errorCode
            res.msg = response.data.errorMessage || '接口请求返回失败且无错误信息！'
          }
        }
        return res
      }
    },
  ]
})

export default request
