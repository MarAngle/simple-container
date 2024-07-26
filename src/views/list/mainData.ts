import listApi, { listItemType } from "@/api/main/listApi"
import { isFile } from "complex-utils"
import { ComplexList, SelectEdit, SelectValue } from "complex-data"
import ButtonEdit from "complex-data/src/dictionary/ButtonEdit"
import { fileDataType } from "complex-data/type"

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
      // collapse: false,
      menu: {
        list: [
          'build',
          'delete',
          new ButtonEdit({
            prop: 'choice2',
            type: 'button',
            option: {
              type: 'default',
              name: '已选择2条时可用',
              disabled(payload: any) {
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
          new ButtonEdit({
            prop: '$import',
            type: 'button',
            option: {
              type: 'default',
              name: '导入',
              icon: 'upload',
              upload: () => {
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
              collapse: 2,
              option: {
                size: 20
              }
            }
          }
        },
        {
          prop: 'search',
          name: '检索框',
          mod: {
            search: {
              $format: 'edit',
              type: 'select',
              cascader: undefined,
              width: 100,
              reload: true,
              search: {},
              getData(this: SelectEdit) {
                return new Promise((resolve) => {
                  // console.log('getData', this.$search?.value)
                  this.$select.setList([
                    {
                      value: this.$search?.value,
                      label: this.$search?.value || '',
                    },
                    {
                      value: 1,
                      label: '1',
                    },
                    {
                      value: 2,
                      label: '2',
                    },
                  ])
                  resolve({})
                })
              }
            }
          }
        },
        {
          prop: 'multipleFile',
          name: '多文件',
          assign(value) {
            return value ? (value as string).split(',') : []
          },
          collect(value) {
            return value ? (value as string[]).join(',') : ''
          },
          mod: {
            search: {
              $format: 'edit',
              type: 'file',
              multiple: true,
              option: {
                multiple: {},
                upload(file: File[]): Promise<{ file: fileDataType[] }> {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      resolve({ file: (file).map(item => {
                        return {
                          value: item.name,
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
          name: '',
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
          prop: 'menu',
          name: '操作',
          originFrom: 'local',
          mod: {
            list: {
              width: 140
            }
          }
        },
        {
          prop: '$index',
          name: 'No',
          originFrom: 'local',
          mod: {
            list: {
              width: 60
            }
          }
        },
        {
          prop: 'id',
          name: 'ID',
          mod: {
            list: {
              width: 80
            },
            info: {}
          }
        },
        {
          prop: 'input',
          name: '输入框',
          mod: {
            list: {
              width: 100
            },
            info: {},
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
          assign(value) {
            return value === 1 ? true : false
          },
          collect(value) {
            return value ? 1 : 0
          },
          mod: {
            list: {
              width: 70
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
          assign(value) {
            return select.getItem(value)
          },
          mod: {
            list: {
              width: 100
            },
            edit: {
              type: 'select',
              cascader: undefined,
              required: true,
              select: select,
              pagination: {},
              getData(this: any) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    this.$select.setList(select.getList())
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
          collect(value) {
            return isFile(value) ? value.name : value
          },
          mod: {
            edit: {
              type: 'file',
              required: true,
              // option: {
              //   upload(file: File): Promise<{ file: fileDataType }> {
              //     return new Promise((resolve) => {
              //       setTimeout(() => {
              //         resolve({ file: { data: (file as File).name, name: (file as File).name  } })
              //       }, 500)
              //     })
              //   },
              // }
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
          assign(value) {
            return value ? (value as string).split(',') : []
          },
          collect(value) {
            if (value) {
              return (value as any[]).map(item => isFile(item) ? item.name : item).join(',')
            }
          },
          mod: {
            edit: {
              type: 'file',
              multiple: true,
              required: true,
              // option: {
              //   upload(file) {
              //     return new Promise((resolve) => {
              //       setTimeout(() => {
              //         resolve({ file: (file as File[]).map(item => {
              //           return {
              //             data: item.name,
              //             name: item.name
              //           }
              //         }) })
              //       }, 500)
              //     })
              //   },
              // }
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
              width: 120
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
          prop: 'timeRange',
          name: '时间范围',
          assign(value) {
            console.log(value)
            return (value as string).split(',')
          },
          collect(value) {
            return (value as string[]).join(',')
          },
          mod: {
            list: {
              width: 300
            },
            edit: {
              type: 'dateRange',
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
          prop: 'form',
          name: '内嵌表单',
          assign(value) {
            return value || {
              name: 'a',
              date: '2019-05-18'
            }
          },
          collect(value) {
            return value
          },
          dictionray: {
            // layout: {
            //   grid: {
            //     default: {
            //       line: 1,
            //       label: 8,
            //       content: 16
            //     }
            //   }
            // },
            list: [
              {
                prop: 'name',
                name: '名称',
                collect(value) {
                  console.log(value)
                  return value
                },
                mod: {
                  list: {
                    width: 120
                  },
                  info: {
                    $redirect: 'edit'
                  },
                  edit: {
                    type: 'input',
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
                prop: 'date',
                name: '日期',
                mod: {
                  list: {
                    width: 120
                  },
                  info: {
                    $redirect: 'edit'
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
            ]
          },
          mod: {
            list: {
              width: 300
            },
            info: {
              $redirect: 'edit'
            },
            edit: {
              grid: {
                line: 1,
                custom(data, position, gridParse) {
                  if (position === 'label') {
                    return {
                      span: 0
                    }
                  } else if (position === 'content') {
                    return {
                      span: 24
                    }
                  } else {
                    return data
                  }
                }
              },
              type: 'form',
              required: true,
              option: {}
            },
            build: {
              $redirect: 'edit'
            },
            change: {
              $redirect: 'edit'
            }
          }
        },
      ]
    },
    pagination: true
  },
  getData(this: ComplexList) {
    return new Promise((resolve, reject) => {
      const postData = { ...this.getSearch() } as any
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
      console.log(targetData)
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
      console.log(targetData)
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
