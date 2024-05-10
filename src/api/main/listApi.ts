import { deepClone, getRandomNum } from 'complex-utils'
import { responseType } from 'complex-request/src/Rule'
import ApiData from './../class/ApiData'

export type listItemType = {
  id: number
  input: string
  number: number
  switch: 1 | 2
  select: 0 | 1 | 2 | 3
  file: string
  multipleFile: string
  date: string
  time: string
  timeRange: string
}

export type listApiSearchArg = {
  input?: string
  page: number
  size: number
}

export type listApiListRes = responseType<{
  data: {
    list: listItemType[]
    total: number
  }
}>
export type listApiBuildRes = responseType<{
  data: {
    id: number
  }
}>
export type listApiChangeRes = responseType<{
  data: boolean
}>

const total = getRandomNum(10, 500)
const list: listItemType[] = []
for (let i = 0; i < total; i++) {
  list.push({
    id: total - i,
    input: 'account' + i,
    number: getRandomNum(0, 10000),
    switch: getRandomNum(1, 2) as listItemType['switch'],
    select: getRandomNum(0, 3) as listItemType['select'],
    file: 'http://a.jpg',
    multipleFile: 'http://a.jpg,http://b.jpg',
    date: '2019-05-15',
    time: '2024-05-15 15:22:22',
    timeRange: '2024-05-15 15:22:22,2024-05-25 15:22:22'
  })
}

const listApi = {
  list: new ApiData<[listApiSearchArg], listApiListRes>({
    name: '基础列表',
    url: 'listApi-list',
    token: false,
    api: {
      pre: '',
      service: ''
    },
    method: 'post',
    data: ['inherit'],
    mock: {
      trigger: 'force',
      data (requestConfig) {
        const page = (requestConfig.data as listApiSearchArg).page
        const size = (requestConfig.data as listApiSearchArg).size
        const start = size * (page - 1)
        const end = start + size
        return {
          result: 'SUCCEED',
          data: {
            list: deepClone(list.slice(start, end)),
            total: list.length
          }
        }
      }
    },
  }),
  build: new ApiData<[Partial<listItemType>], listApiBuildRes>({
    name: '基础列表新增',
    url: 'listApi-build',
    token: false,
    api: {
      pre: '',
      service: ''
    },
    method: 'post',
    data: ['inherit'],
    mock: {
      trigger: 'force',
      data (requestConfig) {
        const item = requestConfig.data as listItemType
        item.id = list.length + 1
        list.unshift(item)
        return {
          result: 'SUCCEED',
          data: {
            id: item.id
          }
        }
      }
    },
  }),
  change: new ApiData<[listItemType], listApiChangeRes>({
    name: '基础列表修改',
    url: 'listApi-change',
    token: false,
    api: {
      pre: '',
      service: ''
    },
    method: 'post',
    data: ['inherit'],
    mock: {
      trigger: 'force',
      data (requestConfig) {
        const targetData = requestConfig.data as listItemType
        for (let i = 0; i < list.length; i++) {
          const originData = list[i];
          console.log(originData.id, i, targetData.id)
          if (originData.id === targetData.id) {
            list[i] = {
              ...targetData
            }
            break
          }
        }
        return {
          result: 'SUCCEED',
          data: true
        }
      }
    },
  }),
}

export default listApi
