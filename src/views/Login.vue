<template>
  <div id="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登录</span>
      </div>
      <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpw">
            <el-input type="password" v-model="ruleForm.userpw" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div id="loginButton">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {apiLogin} from "../request/api";
import store from "../store";
import router from "../router";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: '',
        userpw: ''
      },
      rules: {
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          apiLogin({
            username: this.ruleForm.username,
            userpw: this.ruleForm.userpw
          }).then(function (response){
            const success = response.success
            if (success){
              store.commit("setToken",response.result.token)
              store.commit("setUser",response.result.user)
              store.commit("setLoginSuccess",true)
              localStorage.setItem("token",response.result.token)
              localStorage.setItem("user",JSON.stringify(response.result.user))
              localStorage.setItem("loginSuccess", '1')
              router.replace("/")
            }else {
              that.$refs.ruleForm.resetFields();
              that.$message({
                message: response.message,
                type: 'error',
                duration: '2000',
              })
            }
          })
          // alert('submit!');
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

.box-card{
  width: 500px;
  height: 300px;
}
#card{
  position: absolute;
  top: 25%;
  left: 35%;
}
#loginButton{
  position: absolute;
  left: 35%;
}
</style>
