import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/login'
import tableTest from  '@/view/tableTest'
import formTest from '@/view/formTest'
import css_test from '@/components/css_test'
 import jsTest from '@/components/jsTest'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/table',
      name: 'tableTest',
      component: tableTest
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
    {
      path: '/js',
      name: 'jsTest',
      component: jsTest
    },
  ]
})
