<template>
  <div id="father">
    <div id="son">
      <div class="title-container">
        <h3 class="title">ACG论坛后台管理系统</h3>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          @keyup.enter.native="submitForm('ruleForm')">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpw">
            <el-input type="password" v-model="ruleForm.userpw"></el-input>
          </el-form-item>
          <el-form-item>
            <center>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </center>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {apiLogin} from "../request/api";
import store from "../store";
import router from "../router";
import {Message} from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: '',
        userpw: ''
      },
      rules: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          apiLogin({
            username: this.ruleForm.username,
            userpw: this.ruleForm.userpw
          }).then(function (response) {
            const success = response.success
            if (success) {
              store.commit("setToken", response.result.token)
              store.commit("setUser", response.result.user)
              store.commit("setLoginSuccess", true)
              sessionStorage.setItem("token", response.result.token)
              sessionStorage.setItem("user", JSON.stringify(response.result.user))
              sessionStorage.setItem("loginSuccess", '1')
              router.replace("/")
              Message({
                message: "登录成功",
                type: 'success',
                duration: '2000',
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 300px;
}
#father {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: RGB(45, 58, 75);
}

#son {
  width: auto;
  height: auto;
}
.title-container {
  position: relative;
}
.title {
  font-size: 26px;
  color: white;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
</style>
