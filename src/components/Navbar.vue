<template>
  <div class="navbar">
    <el-row>
      <el-col :span="12">
        <Breadcrumb></Breadcrumb>
      </el-col>
      <el-col :span="12">
        <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="large" :src="$store.state.user.headerimg"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import router from "../router";
import store from "../store";

export default {
  name: "Navbar",
  data() {
    return {}
  },
  components: {Breadcrumb},
  methods:{
    logout:() => {
      // console.log("退出登录")
      sessionStorage.clear()
      store.commit("setToken",'')
      store.commit("setUser",{})
      store.commit("setLoginSuccess",false)
      // location.reload()
      router.push("/login")
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}

.el-dropdown {
  margin-top: 5px;
  margin-right: 30px;
  float: right;
  position: relative
}

.el-breadcrumb {
  margin-top: 15px;
  margin-left: 20px;
  font-size: 15px;
}
</style>
