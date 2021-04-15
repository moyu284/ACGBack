import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Index from '../views/Index'
import Login from '../views/Login'
import Register from "../views/Register";
import Forms from "../views/Forms";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
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
      path: '/forms',
      name: 'Forms',
      component: Forms
    }]
})
