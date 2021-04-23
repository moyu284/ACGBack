import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    loginSuccess: false,
    user:{}
  },
  mutations: {
    setLoginSuccess(state,value) {
      state.loginSuccess = value
    },
    setToken(state,value){
      state.token = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  actions: {

  }
})

export default store
