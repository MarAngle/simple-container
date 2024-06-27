import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { responseType } from "complex-request/src/Rule"
import { RequestConfig } from 'complex-request/src/BaseRequest'
import { AxiosRequest } from "complex-request-axios"

const currentUrl = 'https://gateway-test.wuzheng.com.cn/'

export type RequestConfigType = RequestConfig<AxiosResponse, AxiosRequestConfig>

const request = new AxiosRequest({
  baseUrl: currentUrl,
  rule: {
    prop: 'default',
    token: {
      data: {
        timestamp: {
          require: true,
          location: 'params',
          getValue: function () {
            return Date.now()
          }
        },
        Authorization: {
          require: true,
          location: 'header',
          value: 'authorization'
        }
      }
    },
    login() {
      return Promise.reject({ status: 'fail' })
    },
    refresh() {
      return Promise.reject({ status: 'fail' })
    },
    parse (response) {
      const res: responseType = {
        status: 'fail'
      } as responseType
      if (response.data) {
        res.data = response.data
        if (response.data.result === 'SUCCEED') {
          res.status = 'success'
          res.msg = response.data.errorMessage
        } else if (response.data.result === 'LOGIN') {
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
  }
})

export default request
