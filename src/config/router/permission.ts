import { NavigationGuardNext, RouteLocationRaw } from 'vue-router'
import router from '../router'
import loginData from '../data/login'
import dependData from '../data/depend'

export const loginPath = ['/login']
export const whitePath = ['/404'].concat(loginPath)

const body = document.body

function finalNext (next: NavigationGuardNext, location?: RouteLocationRaw) {
  body.style.backgroundColor = '#FBFBFB'
  if (location) {
    next(location)
  } else {
    next()
  }
}
router.beforeEach((to, from, next) => {
  if (loginData.getStatus('load') === 'success') {
    if (loginPath.indexOf(to.path) !== -1) {
      finalNext(next, { path: '/' })
    } else if (dependData.load !== 'success') {
      dependData.loadData().then(() => {
        const redirect = decodeURIComponent(from.query.redirect as string || to.path)
        if (to.path === redirect) {
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          finalNext(next, { ...to, replace: true })
        } else {
          // 跳转到目的路由
          finalNext(next)
        }
      }).catch(() => {
        finalNext(next, { path: loginPath[0], query: { redirect: to.fullPath } })
      })
    } else {
      finalNext(next)
    }
  } else {
    // 未登录跳转登录或者直接进入白名单
    if (whitePath.indexOf(to.path) !== -1) {
      finalNext(next)
    } else {
      finalNext(next, { path: loginPath[0], query: { redirect: to.fullPath } })
    }
  }
})
