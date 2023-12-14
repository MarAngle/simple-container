import request from "@/simple/request";
import { ComplexList } from "complex-data";

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
              width: 100
            }
          }
        },
        {
          prop: 'recordProcessingStatus',
          name: '处理状态',
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
        this.$formatList(res.data.data)
        console.log(this.$list)
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
