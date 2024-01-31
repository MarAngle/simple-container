
import { CSSProperties, VNode } from "vue";
import { RouteComponent, RouteRecordRaw } from "vue-router";
import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import router from "../router";
import icon from "complex-component-antd/icon";
import { layout } from "complex-plugin";

export type menuType = {
  path: string
  redirect?: string
  name: string
  component: RouteComponent
  meta: {
    icon?: () => VNode
    name?: string
    hidden?: boolean
    style?: CSSProperties
  }
  children?: menuType[]
}

const menuList: menuType[] = [
  {
    path: '/list',
    redirect: '/list/home',
    name: '列表',
    component: () => import('@/config/layout/ComplexLayout.vue'),
    meta: {
      icon: () => icon.parse('plus') as VNode
    },
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
  list: menuType[]
  current: string[]
  collapsed: boolean
  constructor(initOption: BaseDataInitOption) {
    super(initOption)
    this.list = []
    this.current = []
    this.collapsed = false
  }
  setCurrent(val: menuType) {
    this.current = [val.path]
  }
  toggleCollapsed() {
    this.collapsed = !this.collapsed
    layout.mod.sider.onChange()
  }
}

function formatMenu(olist: menuType[]) {
  olist.forEach(item => {
    if (!item.meta.name) {
      item.meta.name = item.name
    }
    if (item.children) {
      formatMenu(item.children)
    }
  })
}

const menuData = new MenuData({
  prop: 'menuData',
  getData(this: MenuData) {
    return new Promise((resolve) => {
      formatMenu(menuList)
      this.list = menuList
      this.list.forEach(item => {
        router.addRoute(item as RouteRecordRaw)
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
