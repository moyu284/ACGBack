import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  token: sessionStorage.getItem("token") || '',
  loginSuccess: Number(JSON.parse(sessionStorage.getItem("loginSuccess"))) || 0,
  user:JSON.parse(sessionStorage.getItem("user")) || {}
}

const store = new Vuex.Store({
  state,
  mutations: {
    setLoginSuccess(state,value) {
      state.loginSuccess = value
    },
    setToken(state,value){
      state.token = value
    },
    setUser(state,value){
      state.user = value
    },
    setUserHeader(state,value){
      state.user.headerimg = value
      sessionStorage.setItem("user",JSON.stringify(state.user))
    },
    setUserPhone(state,value){
      state.user.phone = value;
      sessionStorage.setItem("user",JSON.stringify(state.user))
    },
    setUserEmail(state,value){
      state.user.email = value;
      sessionStorage.setItem("user",JSON.stringify(state.user))
    }
  },
  actions: {

  }
})

export default store
