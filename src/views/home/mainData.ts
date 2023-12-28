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
    search: {
      menu: {},
      list: [
        {
          prop: 'vin',
          name: 'VIN',
          mod: {
            search: {
              $format: 'edit',
              type: 'input',
              option: {
                size: 20
              }
            }
          }
        },
        {
          prop: 'svin',
          name: 'sVIN',
          mod: {
            search: {
              $format: 'edit',
              type: 'input',
              option: {
                size: 20
              }
            }
          }
        },
        {
          prop: 'evin',
          name: 'eVIN',
          mod: {
            search: {
              $format: 'edit',
              type: 'input',
              option: {
                size: 20
              }
            }
          }
        },
      ]
    },
    dictionary: {
      list: [
        {
          prop: 'vin',
          name: 'VIN',
          mod: {
            list: {
              width: 100
            },
            edit: {
              type: 'input',
              required: true,
              option: {
                size: 20
              }
            },
            build: {
              $redirect: 'edit'
            },
            change: {
              $redirect: 'edit'
            }
          }
        },
        {
          prop: 'faultName',
          name: '名称',
          mod: {
            list: {
              width: 100
            },
            edit: {
              type: 'input',
              required: true,
              option: {
                size: 20
              }
            },
            build: {
              $redirect: 'edit'
            },
            change: {
              $redirect: 'edit'
            }
          }
        },
        {
          prop: 'recordLocationoccur',
          name: '故障地址',
          mod: {
            list: {
              width: 200
            },
            edit: {
              type: 'input',
              required: true,
              option: {
                size: 20
              }
            },
            build: {
              $redirect: 'edit'
            },
            change: {
              $redirect: 'edit'
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
            },
            edit: {
              type: 'select',
              required: true,
              option: {
                list: select.getList()
              }
            },
            build: {
              $redirect: 'edit'
            },
            change: {
              $redirect: 'edit'
            }
          }
        },
        {
          prop: 'recordTimeRelease',
          name: '时间',
          mod: {
            list: {
              width: 100
            },
            edit: {
              type: 'date',
              required: true,
              option: {
                time: {}
              }
            },
            build: {
              $redirect: 'edit'
            },
            change: {
              $redirect: 'edit'
            }
          }
        },
        {
          prop: 'menu',
          name: '操作',
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
  },
  buildData(this: ComplexList, targetData) {
    return new Promise((resolve) => {
      console.log(targetData)
      setTimeout(() => {
        this.$list.push(this.$createDataByDictionary(targetData))
        resolve({})
      }, 1000)
    })
  },
  changeData(this: ComplexList, targetData, originData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        targetData = this.$createDataByDictionary(targetData)
        const index = this.$list.indexOf(originData)
        this.$list.splice(index, 1, {
          ...originData,
          ...targetData
        })
        resolve({})
      }, 1000)
    })
  }
})

export default mainData
