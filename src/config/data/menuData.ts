import { RouteRecordRaw } from "vue-router";
import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import router from "../router";

const roleRouter: RouteRecordRaw[] = [
  {
    path: '/list',
    name: '列表',
    component: () => import('@/views/list/index.vue'),
    meta: {}
  }
]

class MenuData extends BaseData{
  data: RouteRecordRaw[]
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
    this.data = []
  }
}

const menuData = new MenuData({
  prop: 'menuData',
  getData(this: MenuData) {
    return new Promise((resolve) => {
      this.data = roleRouter
      this.data.forEach(item => {
        router.addRoute(item)
      })
      resolve({})
    })
  }
})

export default menuData
