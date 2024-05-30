import { AxiosResponse } from 'axios'
import { deepCloneData, getEnv, isCompleteUrl } from 'complex-utils'
import { responseType } from 'complex-request/src/Rule'
import { Data } from 'complex-data'
import request, { RequestConfigType } from '@/config/request'

export type RequestConfigTypeKeys = keyof RequestConfigType
export type RequestConfigTypeKeysWithInherit = RequestConfigTypeKeys | 'inherit'

export interface apiType {
  pre?: string
  service?: string
}

const mockConfig =  getEnv('real') === 'development'

export type mockType<R extends responseType = responseType> = {
  trigger?: boolean | 'force'
  data: ((requestConfig: Partial<RequestConfigType>) => R['data'])
}

export interface ApitDataInitOption<R extends responseType = responseType> {
  name: string
  url: string
  token?: RequestConfigType['token']
  api?: apiType
  method?: RequestConfigType['method']
  data?: RequestConfigTypeKeysWithInherit[]
  format?: RequestConfigType['format']
  mock?: mockType<R>
}

function formatApi (url: string, api?: apiType) {
  if (api) {
    if (!isCompleteUrl(url)) {
      if (api.pre && isCompleteUrl(api.pre)) {
        return api.pre + url
      }
      if (api.service) {
        return api.service + url
      }
    }
  }
  return url
}

function appendProp (requireData: Partial<RequestConfigType>, propList: RequestConfigTypeKeys[], args: unknown[]) {
  if (propList && propList.length > 0 && args && args.length > 0) {
    for (let i = 0; i < propList.length; i++) {
      const prop = propList[i]
      const data = args[i]
      if (data !== undefined) {
        if (prop !== 'url') {
          (requireData[prop] as unknown) = data as unknown
        } else {
          requireData.url += data as string
        }
      }
    }
  }
}

const getTypeList = [undefined, 'get', 'delete']

class ApiData<A extends unknown[] = unknown[], R extends responseType = responseType> extends Data {
  name: string
  url: string
  token?: RequestConfigType['token']
  api?: apiType
  method?: RequestConfigType['method']
  data: RequestConfigTypeKeys[]
  format?: RequestConfigType['format']
  mock?: mockType<R>['data']
  constructor(initOption: ApitDataInitOption<R>) {
    super()
    this.name = initOption.name
    this.url = initOption.url
    this.token = initOption.token
    this.api = initOption.api
    this.method = initOption.method
    if (initOption.data) {
      const inherit = getTypeList.indexOf(this.method) > -1 ? 'params' : 'data'
      this.data = initOption.data.map(dataStr => {
        return dataStr === 'inherit' ? inherit : dataStr
      })
    } else {
      this.data = []
    }
    this.format = initOption.format
    if (initOption.mock) {
      if ((mockConfig === true && initOption.mock.trigger !== false) || initOption.mock.trigger === 'force') {
        this.mock = initOption.mock.data
      }
    }
  }
  require(...args: A): Promise<R> {
    const url = formatApi(this.url, this.api)
    const requestConfig: Partial<RequestConfigType> = {
      url: url,
      method: this.method,
      token: this.token,
      format: this.format
    }
    appendProp(requestConfig, this.data, args)
    if (!this.mock) {
      return request.request(requestConfig) as Promise<R>
    }
    // 准备模拟请求
    requestConfig.url = request.formatUrl(requestConfig.url!)
    return Promise.resolve(request.$getRule(requestConfig.url)!.parse({ data: deepCloneData(this.mock(requestConfig)) } as AxiosResponse, requestConfig as RequestConfigType)) as Promise<R>
  }
}

export default ApiData
