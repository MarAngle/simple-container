import listApi, { listItemType } from "@/api/main/listApi";
import request from "@/config/request";
import { ComplexList, SelectValue } from "complex-data";
import DefaultEditButton from "complex-data/src/dictionary/DefaultEditButton";

const select = new SelectValue({
  list: [
    {
      value: 0,
      label: '选项1'
    },
    {
      value: 1,
      label: '选项2'
    },
    {
      value: 2,
      label: '选项3'
    },
    {
      value: 3,
      label: '选项4'
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
              name: '已选择2条时可用',
              disabled(payload) {
                return payload.choice != 2
              },
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
          prop: 'input',
          name: '输入框',
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
          prop: 'multipleFile',
          name: '多文件',
          format(value) {
            return value ? (value as string).split(',') : []
          },
          post(value) {
            return value ? (value as string[]).join(',') : ''
          },
          mod: {
            search: {
              $format: 'edit',
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
            }
          }
        },
        {
          prop: 'menu',
          name: {
            search: ''
          },
          mod: {
            search: {
              $format: 'edit',
              type: 'button',
              option: {
                type: 'primary',
                icon: 'refresh',
                name: '测试按钮'
              }
            }
          }
        },
      ]
    },
    dictionary: {
      propData: {
        id: 'id'
      },
      list: [
        {
          prop: '$index',
          name: 'No',
          mod: {
            list: {
              width: 50
            }
          }
        },
        {
          prop: 'id',
          name: 'ID',
          mod: {
            list: {
              width: 80
            }
          }
        },
        {
          prop: 'input',
          name: '输入框',
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
          prop: 'number',
          name: '数字',
          mod: {
            list: {
              width: 80
            },
            edit: {
              type: 'inputNumber',
              required: true,
              option: {
                max: 10000,
                min: 0
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
          prop: 'switch',
          name: '开关',
          format(value) {
            return value === 1 ? true : false
          },
          post(value) {
            return value ? 1 : 0
          },
          mod: {
            list: {
              width: 60
            },
            edit: {
              type: 'switch',
              required: true
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
          prop: 'select',
          name: '选择器',
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
                  }, 200)
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
          prop: 'file',
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
          prop: 'multipleFile',
          name: '多文件',
          format(value) {
            return value ? (value as string).split(',') : []
          },
          post(value) {
            return value ? (value as string[]).join(',') : ''
          },
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
          prop: 'date',
          name: '日期',
          mod: {
            list: {
              width: 100
            },
            edit: {
              type: 'date',
              required: true,
              option: {
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
          prop: 'time',
          name: '时间',
          mod: {
            list: {
              width: 175
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
      const postData = this.getSearch() as any
      console.log(postData)
      postData.page = this.getPage()
      postData.size = this.getPageSize()
      listApi.list.require(postData).then(res => {
        this.formatList(res.data.data.list, res.data.data.total)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  buildData(this: ComplexList, targetData) {
    return new Promise((resolve, reject) => {
      listApi.build.require(targetData).then(res => {
        console.log(res.data.data.id)
        this.reloadData(true)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  changeData(this: ComplexList, targetData, originData) {
    return new Promise((resolve, reject) => {
      targetData.id = originData.id
      listApi.change.require(targetData as listItemType).then(res => {
        console.log(res.data.data)
        this.reloadData(true)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
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
