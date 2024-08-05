
import { CSSProperties, VNode, h } from "vue";
import { RouteComponent, RouteRecordRaw } from "vue-router";
import { HomeOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { BaseData } from "complex-data";
import { BaseDataInitOption } from "complex-data/src/data/BaseData";
import router from "../router";
import pluginLayout from "../complex/pluginLayout";

export type menuType = {
  path: string
  redirect?: string
  name: string
  component?: RouteComponent
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
    path: '/home',
    name: '首页',
    component: () => import('@/views/home/index.vue'),
    meta: {
      icon: () => h(HomeOutlined)
    }
  },
  {
    path: '/list',
    redirect: '/list/home',
    name: '列表',
    meta: {
      icon: () => h(TableOutlined)
    },
    children: [
      {
        path: '/list/home',
        name: '基础列表',
        component: () => import('@/views/list/index.vue'),
        meta: {}
      },
    ]
  },
  {
    path: '/develop',
    redirect: '/develop/home',
    name: '开发',
    meta: {
      icon: () => h(TableOutlined)
    },
    children: [
      {
        path: '/develop/home',
        name: '基础开发',
        component: () => import('@/views/develop/index.vue'),
        meta: {}
      },
    ]
  },
  {
    path: '/setting',
    redirect: '/setting',
    name: '设置',
    meta: {
      icon: () => h(SettingOutlined)
    }
  },
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
    pluginLayout.triggerChange('sider')
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
