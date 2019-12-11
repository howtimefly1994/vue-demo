import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import container from  '@/view/container'
import formTest from '@/view/formTest'
import css_test from '@/components/css_test'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'container',
      component: container
    },
    {
      path: '/form',
      name: 'formTest',
      component: formTest
    },
    {
      path: '/css',
      name: 'css_test',
      component: css_test
    },
    
  ]
})
