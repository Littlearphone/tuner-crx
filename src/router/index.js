import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    redirect: '/option/index'
  },
  {
    path: '/popup/index',
    component: () => import('../views/popup/PopupIndex.vue')
  },
  {
    path: '/option/index',
    component: () => import('../views/option/OptionIndex.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})
export default router
