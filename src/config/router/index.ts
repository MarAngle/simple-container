import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue'),
    meta: {
      name: '404'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
