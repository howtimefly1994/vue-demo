import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import container from '@/view/container'
import formTest from '@/view/test/formTest'
import css_test from '@/components/css_test'
import ElementUI from 'element-ui';
Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'container',
      component: container,
      meta: {
        requrieAuth: true
      },
      children: [
        {
          path: '/form',
          name: 'formTest',
          component: formTest,
          meta: {
            requrieAuth: true
          }
        }
      ]
    },
    // {
    //   path: '/form',
    //   name: 'formTest',
    //   component: formTest,
    //   meta: {
    //     requrieAuth: true
    //   }
    // },
    {
      path: '/css',
      name: 'css_test',
      component: css_test
    },

  ]
})
vueRouter.beforeEach((to, from, next) => {
  var token = localStorage.getItem('Authorization');
  // console.log('to :', to);

  if (to.meta.requrieAuth == true) {
    if (token) {
      next()
    } else {
      ElementUI.Message({
        message: 'token过期请重新登录',
        type: 'warning'
      });
      setTimeout(() => {
        next({ path: '/' })
      }, 1000);
      
    }
  } else {
    next()
  }





})

export default vueRouter;