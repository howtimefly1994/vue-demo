// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from '@/store/store.js'
import ElementUI from 'element-ui'
import api from './api/index'
import 'element-ui/lib/theme-chalk/index.css'
import vueRouter from './router'

Vue.config.productionTip = false
Vue.prototype.$http = api

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
