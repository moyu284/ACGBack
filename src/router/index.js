import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Welcome from "../components/Welcome";
import Login from "../views/Login";

import store from "../store";
import Carousel from "../components/Carousel";
import Partition from "../components/Partition";
import Plat from "../components/Plat";
import SubPlate from "../components/SubPlate";
import PlatManger from "../components/PlatManger";
import Topic from "../components/Topic";
import User from "../components/User";

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login,
    meta: {
      // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/',
    name: '后台管理',
    component: Index,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: '/',
        name: '首页',
        component: Welcome,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: 'carousel',
        name: '轮播图',
        component: Carousel,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }

      },
      {
        path: 'partition',
        name: '分区管理',
        component: Partition,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        name: '版块管理',
        path: 'plate',
        component: PlatManger,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        children: [
          {
            path: 'plate',
            name: '版块管理',
            component: Plat,
          },
          {
            path: 'subPlate',
            name: '子版块管理',
            component: SubPlate,
            meta: {
              requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
          }]
      },
      {
        name: '帖子管理',
        path: 'topic',
        component: Topic,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: 'user',
        name: '用户管理',
        component: User,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }

      }
    ]
  },
]


const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})


export default router
