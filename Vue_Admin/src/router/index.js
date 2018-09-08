
import Vue from 'vue'
import Router from 'vue-router'
import indexExsit from 'pages/indexExsit.vue'
import addsysUser from 'pages/addsysUser.vue'
import menuAdmin from 'pages/menuAdmin.vue'
import login from 'pages/loginRegister.vue'
import blank from 'pages/blank.vue'
import blank1 from 'pages/blank1.vue'
import rolesAdmin from 'pages/rolesAdmin.vue'
import Main from 'pages/Main.vue'
import sysRequestAdmin from 'pages/sysRequestAdmin'
import { getCookie, delCookie } from '../lib/cookie.js'
Vue.use(Router)
let router = new Router({
  linkActiveClass: 'list-active',
  routes: [
    {path: '/main',
      component: Main,
      name: 'main',
      children: [
        {path: '/indexExsit', name: '首页', component: indexExsit},
        {path: '/addsysUser', name: 'addsysUser', component: addsysUser},
        {path: '/rolesAdmin', name: 'rolesAdmin', component: rolesAdmin},
        {path: '/menuAdmin', name: 'menuAdmin', component: menuAdmin},
        {path: '/sysRequestAdmin', name: 'sysRequestAdmin', component: sysRequestAdmin},
        {path: '/blank', name: 'blank', component: blank},
        {path: '/blank1', name: 'blank1', component: blank1}
      ]
    },
    {path: '/login', name: 'login', component: login},
    {path: '/', redirect: '/main', component: Main},
    {path: '*', redirect: { name: 'login' }}
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'main' && !getCookie('session')) {
    // 未登录
    delCookie('session')
    router.push({
      name: 'login'
    })
  } else if (to.name === 'login' && getCookie('session')) {
      // 已登录，跳转至首页
    router.push({
      name: 'main'
    })
  }
  next()
})

export default router
