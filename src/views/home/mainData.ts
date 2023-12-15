import request from "@/simple/request";
import { ComplexList, SelectValue } from "complex-data";

const select = new SelectValue({
  list: [
    {
      value: 0,
      label: '未处理'
    },
    {
      value: 1,
      label: '处理中'
    },
    {
      value: 2,
      label: '已完成'
    },
    {
      value: 1,
      label: '已关闭'
    },
  ]
})

const mainData = new ComplexList({
  prop: 'mainData',
  module: {
    dictionary: {
      list: [
        {
          prop: 'vin',
          name: 'VIN',
          mod: {
            list: {
              width: 100
            }
          }
        },
        {
          prop: 'faultName',
          name: '名称',
          mod: {
            list: {
              width: 100
            }
          }
        },
        {
          prop: 'recordLocationoccur',
          name: '故障地址',
          mod: {
            list: {
              width: 200
            }
          }
        },
        {
          prop: 'recordProcessingStatus',
          name: '处理状态',
          showProp: {
            default: 'value',
            list: 'label'
          },
          format(value) {
            return select.get(value)
          },
          mod: {
            list: {
              width: 100
            }
          }
        },
        {
          prop: 'recordTimeRelease',
          name: '时间',
          mod: {
            list: {
              width: 100
            }
          }
        },
      ]
    }
  },
  getData(this: ComplexList) {
    return new Promise((resolve, reject) => {
      request.post({
        url: 'vehicle/warning/digital/screen/getWarningList',
        data: {
          agreement: 'GB32960',
          type: [2],
          limit: 15
        }
      }).then(res => {
        this.$formatList(res.data.data[2])
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
})

console.log(mainData)

export default mainData
