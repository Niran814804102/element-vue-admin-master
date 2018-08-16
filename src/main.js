// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'

import App from './App'
import store from './store'
import util from './util/util'
import resource from './resource'
import { routers } from './router'
import Bus from './util/bus'
import {get, patch, post, put} from './util/axios'
import {delCookie, getCookie, setCookie} from './util/cookie'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.use(N3Components)
Vue.use(Vuelidate)

Vue.prototype.$Bus = Bus;
Vue.prototype.$axios = {
  get,
  post,
  patch,
  put
};//定义axios标签
Vue.prototype.$cookie = {
  getCookie,
  setCookie,
  delCookie
};//定义cookie标签

Vue.config.productionTip = false

function guardRoute (to, from, next) {
  if(sessionStorage.getItem("username") != null) {
    next();
    return true;
  }else {
    Bus.$emit("alertModalParams", {
      alertVisible: true,
      alertType: "error",
      alertDescription: "该页面需要先登录~"
    });
    next({
      path: from.path
    });
    return false;
  }
}

// 路由配置
const RouterConfig = {
  mode: 'hash',
  routes: routers
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  let currentPageTitle = to.meta.title;
  if (to.matched.some(m => m.meta.requireAuth)) {
    if (!guardRoute(to, from, next)){
      currentPageTitle = from.meta.title;
    }
  } else {
    next();
  }
  util.title(currentPageTitle)//设置网页标题
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  resource,
  template: '<App/>',
  components: { App }
})
