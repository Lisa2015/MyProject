// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'
import Vuex from 'vuex'
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'babel-polyfill'
// import EventBus from './lib/eventBus.js'

import store from '../src/vuex/index'
import axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(Vuex)
Vue.use(VueRouter)

// Vue.prototype.$bus = EventBus
axios.defaults.withCredentials = true
Vue.prototype.axios = axios

// 请求拦截器
// axios.interceptors.request.use(function (config){
//   return config
// })

// axios.interceptors.response.use(function (config){ 

//   return config
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
