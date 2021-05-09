// 引入
import axios from "axios"
import QS from 'qs';
import {Message} from 'element-ui'    //引入 element-ui 的 Message 模块，用于信息提示
import store from "../store";     //引入 vuex 中的数据
import {getToken} from "../public/auth";
import router from "../router";
import el from "element-ui/src/locale/lang/el";
// 环境
axios.defaults.baseURL = 'http://localhost:8081/';   //  要请求的后台地址
// 请求超时
axios.defaults.timeout = 30000;
//  post 请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.responseType = 'json'
axios.defaults.withCredentials = true

// create an axios instance
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做什么
    if (config.method === "post") {
      // 序列化
      // config.data = qs.stringify(config.data);
      // config.data = JSON.stringify(config.data);
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    } else {
      if (localStorage.getItem("token")) {
        // 若是有做鉴权token , 就给头部带上token
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage (隐身模式)的使用
        // config.headers['token'] = getToken()
        config.headers.token = getToken()
      }
    }
    return config;
  },
  error => {
    // 对请求错误做些什么，自己定义
    Message({                  //使用element-ui的message进行信息提示
      showClose: true,
      message: error,
      type: "warning"
    });
    return Promise.reject(error);
  }
)

// // response interceptor
axios.interceptors.response.use(
  response => {
    const code = response.data.code
    // console.log("code:"+code)

    // console.log(response.data)
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (code === 200) {
      return response;
    } else {
      switch (code) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Message({
            message: response.data.message,
            type: 'error',
            duration: 2000
          });
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: '登录过期，请重新登录',
            duration: 1000,
          });
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          store.commit('user', {})
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            duration: 1500,
          });
          break;
        case 100:
          console.log("100错误")
          Message({
            message: response.data.message,
            type: 'warning',
            duration: 1500
          });
          break;
        case 500:
          console.log("500错误")
          Message({
            message: response.data.message,
            type: 'error',
            duration: 1500
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          console.log("其他")
          Message({
            message: response.data.message,
            type: 'error',
            duration: 2000
          });
      }
    }

  },
  error => {
    if (error.data.code) {
      Message({
        message: error.data.message,
        type: 'error',
        duration: 1000
      })
      return error.response;
    }
  });

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params,).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params,)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * $delete，对应delete请求
 */
export function $delete(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
