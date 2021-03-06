// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '../static/element-css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false
// 环境
axios.defaults.baseURL ='http://localhost:8081/';   //  要请求的后台地址
// 请求超时
axios.defaults.timeout =30000;
//  post 请求头
axios.defaults.headers.post['Content-Type'] ='application/json';

/* eslint-disable no-new */
new Vue({
	el: '#app',
  store: store,
	router,
	components: {
		App
	},
	template: '<App/>'
})
