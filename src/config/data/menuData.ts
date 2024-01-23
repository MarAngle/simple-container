import { RouteRecordRaw } from "vue-router";
import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import router from "../router";

const roleRouter: RouteRecordRaw[] = [
  {
    path: '/list',
    redirect: '/list/home',
    name: '列表',
    component: () => import('@/config/layout/ComplexLayout.vue'),
    meta: {},
    children: [
      {
        path: '/list/home',
        name: '列表',
        component: () => import('@/views/list/index.vue'),
        meta: {}
      },
    ]
  }
]

export class MenuData extends BaseData{
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
      router.addRoute({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      resolve({})
    })
  }
})

export default menuData
