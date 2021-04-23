import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import Register from "../views/Register";
import Forms from "../views/Forms";
import Details from "../views/Details";
import Publish from "../views/Publish";
import UserInfo from "../views/UserInfo";
import store from "../store";
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forums',
    name: 'Forms',
    component: Forms
  },
  {
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: UserInfo,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  }]


const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    }else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
    next();
  }
})


export default router
