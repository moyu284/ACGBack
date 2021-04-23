<template>
  <el-row type="flex" justify="start" align="middle"
          style="hebox-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <el-col :span="13" :offset="2">
      <Navigation :menu-list="menuList" ></Navigation>
    </el-col>
    <el-col :span="6">
      <el-menu mode="horizontal" menu-trigger="hover" router>
        <el-menu-item index="/userInfo" v-if="this.$store.state.loginSuccess">
          <el-avatar size="large" :src="this.$store.state.user.headerimg" fit="fill"></el-avatar>
        </el-menu-item>
        <el-menu-item index="/userInfo" v-if="this.$store.state.loginSuccess"><i class="el-icon-user-solid"/></el-menu-item>
        <el-menu-item v-if="this.$store.state.loginSuccess"><i class="el-icon-switch-button" @click="signOut()"/></el-menu-item>

        <el-menu-item index="/login" v-if="!this.$store.state.loginSuccess">登录</el-menu-item>
        <el-menu-item index="/register" v-if="!this.$store.state.loginSuccess">注册</el-menu-item>
        <el-menu-item >
          <el-button style="background-color: #FF4B8B;" @click="toPublish">
            发布
          </el-button>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import Navigation from "./Navbar/Navigation";
import NavigationItem from "./Navbar/NavigationItem";
import axios from "axios";
import {apiGetForums} from "../request/api";
import store from "../store";
import router from "../router";


export default {
  name: 'NavMenu',
  components: {Navigation, NavigationItem},
  data() {
    return {
      menuList: [],
      user: {}
    }
  },
  created: function () {
    this.getFormus()
  },
  methods: {
    toPublish: function () {
      this.$router.push('/publish')
    },
    getFormus: function () {
      const that = this;
      apiGetForums().then(function (response) {
        // console.log(response)
        that.menuList = response.result
      })
    },
    signOut: function (){
      localStorage.clear()
      store.commit("setToken",'')
      store.commit("setUser",{})
      store.commit("setLoginSuccess",false)
      router.replace("/")
    }
  }
}
</script>

<style scoped>
</style>
