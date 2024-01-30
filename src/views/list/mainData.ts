import request from "@/config/request";
import { ComplexList, SelectValue } from "complex-data";
import DefaultEditButton from "complex-data/src/dictionary/DefaultEditButton";

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
      value: 3,
      label: '已关闭'
    },
  ]
})

const mainData = new ComplexList({
  prop: 'mainData',
  module: {
    choice: {},
    search: {
      menu: {
        list: [
          'build',
          'delete',
          new DefaultEditButton({
            prop: 'choice2',
            type: 'button',
            option: {
              type: 'default',
              name: '测试已选择2条时可用',
              click: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({})
                  }, 2000)
                })
              }
            }
          }),
          new DefaultEditButton({
            prop: '$import',
            type: 'button',
            option: {
              type: 'default',
              name: '导入',
              icon: 'upload',
              upload: (file) => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({})
                  }, 3000)
                })
              }
            }
          })
        ]
      },
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
        {
          prop: 'menu',
          name: 'menu',
          mod: {
            search: {
              $format: 'edit',
              type: 'button'
            }
          }
        },
      ]
    },
    dictionary: {
      propData: {
        id: 'vin'
      },
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
          prop: 'url',
          name: '文件',
          mod: {
            edit: {
              type: 'file',
              required: true,
              option: {
                upload(file) {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({ file: { data: (file as File).name, name: (file as File).name  } })
                    }, 500)
                  })
                },
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
          prop: 'multipleUrl',
          name: '多文件',
          mod: {
            edit: {
              type: 'file',
              multiple: true,
              required: true,
              option: {
                upload(file) {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({ file: (file as File[]).map(item => {
                        return {
                          data: item.name,
                          name: item.name
                        }
                      }) })
                    }, 500)
                  })
                },
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
                list: []
              },
              pagination: {},
              getData(this: any) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    this.$option.list = select.getList()
                    this.$pagination.setCount(100)
                    resolve({})
                  }, 2000)
                })
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
                time: {},
                disabledDate: {
                  start: {
                    value: 'today',
                    eq: true
                  },
                  end: {
                    value: 'tomorrow',
                    eq: true
                  }
                }
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
    },
    pagination: true
  },
  getData(this: ComplexList) {
    return new Promise((resolve, reject) => {
      console.log(this.getSearch())
      request.post({
        url: 'vehicle/warning/digital/screen/getWarningList',
        data: {
          agreement: 'GB32960',
          type: [2],
          limit: 15
        }
      }).then(res => {
        this.formatList(res.data.data[2], 100)
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
        this.$list.push(this.createDataByDictionary(targetData))
        resolve({})
      }, 1000)
    })
  },
  changeData(this: ComplexList, targetData, originData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        targetData = this.createDataByDictionary(targetData)
        const index = this.$list.indexOf(originData)
        this.$list.splice(index, 1, {
          ...originData,
          ...targetData
        })
        resolve({})
      }, 1000)
    })
  },
  deleteData(this: ComplexList, targetData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.$list.indexOf(targetData)
        this.$list.splice(index, 1)
        resolve({})
      }, 1000)
    })
  },
  multipleDeleteData(this: ComplexList, choiceList) {
    return new Promise((resolve) => {
      setTimeout(() => {
        choiceList.forEach(item => {
          const index = this.$list.indexOf(item)
          this.$list.splice(index, 1)
        })
        resolve({})
      }, 3000)
    })
  }
})

export default mainData
