import { getRandomNum } from 'complex-utils'
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
}

export type listApiArg = {
  input?: string
  page: number
  size: number
}

export type listApiRes = responseType<{
  data: listItemType[]
}>

const listApi = new ApiData<[listApiArg], listApiRes>({
  name: '基础列表',
  url: 'listApi',
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
      const page = (requestConfig.data as listApiArg).page
      const size = (requestConfig.data as listApiArg).size
      const start = size * (page - 1)
      const end = start + size
      const list = []
      for (let i = start; i < end; i++) {
        list.push({
          id: i,
          input: 'account' + i,
          number: getRandomNum(0, 10000),
          switch: getRandomNum(1, 2) as listItemType['switch'],
          select: getRandomNum(0, 3) as listItemType['select'],
          file: 'http://a.jpg',
          multipleFile: 'http://a.jpg,http://b.jpg',
          date: '2019-05-15',
          time: '2024-05-15 15:22:22'
        })
      }
      return {
        result: 'SUCCEED',
        data: list
      }
    }
  },
})

export default listApi
