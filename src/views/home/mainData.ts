import request from "@/simple/request";
import { ComplexList } from "complex-data";

const mainData = new ComplexList({
  prop: 'mainData',
  module: {
    dictionary: {
      list: [
        {
          prop: 'id',
          name: 'ID',
          mod: {
            list: {
              width: 100
            }
          }
        },
        {
          prop: 'name',
          name: '名称',
          mod: {
            list: {
              width: 100
            }
          }
        },
      ]
    }
  },
  getData() {
    return new Promise((resolve, reject) => {
      request.post({
        url: 'vehicle/warning/digital/screen/getWarningList'
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})

console.log(mainData)

export default mainData
