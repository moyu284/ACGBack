<template>
  <div id="card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户注册</span>
      </div>
      <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.userPw"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import router from "../router";
import {apiRegister} from "../request/api";

export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6){
          callback(new Error('密码不能少于6位'));
        }else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
        }
        callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.userPw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (value !== '') {
          const reg = /^1[3456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'));
          }
        }
        callback();
      }, 1000);
    };
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        if (value !== '') {
          const reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }, 1000);
    };
    return {
      ruleForm: {
        userName: '',
        userPw: '',
        checkPass: '',
        email: '',
        phone: ''
      },
      rules: {
        userName:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5,max:50, message: '长度最低5字符,最大50字符', trigger: 'blur' }
        ],
        userPw: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiRegister({
            username: this.ruleForm.userName,
            userpw: this.ruleForm.userPw,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone
          }).then(response => {
            if (response.success){
              that.$message({
                message: response.result,
                type: "success",
                duration: 2000,
                center: true
              })
              router.replace("/").catch(err => {})
            }
          })
        } else {
          that.$message({
            message: '请检查注册信息',
            type: "error",
            duration: 2000,
            center: true
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
#card{
  position: absolute;
  top: 10%;
  left: 35%;
}
.box-card{
  width: 500px;
  height: 500px;
}
</style>
