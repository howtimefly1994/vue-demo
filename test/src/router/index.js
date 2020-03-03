import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const vueRouter = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import("@/components/login")
    },
    {
      path: '/main',
      name: 'container',
      component: () => import("@/view/container"),
      meta: {
        requrieAuth: true
      },
      children: [
        {
          path: '/form',
          name: 'formTest',
          component: () => import("@/view/test/formTest"),
          meta: {
            requrieAuth: true,
            title: '需求管理'
          }
        },
        {
          path: '/thetest',
          name: 'thetest',
          component: () => import("@/view/thetest"),
          meta: {
            requrieAuth: true,
            title: '测试'
          }
        },
        {
          path: '/pet',
          name: 'pet',
          component: () => import("@/view/pet/pet.vue"),
          meta: {
            requrieAuth: true,
            title: '指派人员管理'
          }
        },
        {
          path: '/index',
          name: 'index',
          component: () => import("@/view/index/index.vue"),
          meta: {
            requrieAuth: true,
            title: '首页'
          },

        },
        {
          path: '/markdown',
          name: 'markdown',
          component: () => import("@/view/markdown/index.vue"),
          meta: {
            requrieAuth: true,
            title: 'markdown'
          },


        },
      ]
    },

  ]
})
vueRouter.beforeEach((to, from, next) => {
  var token = localStorage.getItem('Authorization');

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