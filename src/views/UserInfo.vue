<template>
  <center>
    <el-card>
      <div slot="header">
        <div style="display: flex">
          <div>
            <el-avatar size="large" :src="this.$store.state.user.headerimg"></el-avatar>
          </div>
          <span id="UserName">{{ this.$store.state.user.username }}</span>
        </div>
      </div>
      <el-tabs tab-position="top" style="height: auto;">
        <el-tab-pane label="头像">
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8081/image/imageUpload"
            :multiple="false"
            :on-success="uploadImage">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="个人信息">
          <div style="width: 500px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" label-position="right">
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input type="text" v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </center>
</template>

<script>
import {apiLogin, apiUpdateUserInfo, apiUploadHeader} from "../request/api";
import store from "../store";
import router from "../router";

export default {
  name: "UserInfo",
  data() {
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
        email: this.$store.state.user.email,
        phone: this.$store.state.user.phone
      },
      rules: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    uploadImage: function (response, file, fileList) {
      const that = this
      // console.log(response)
      apiUploadHeader({
        id: that.$store.state.user.id,
        headerimg: response.result
      })
      store.commit("setUserHeader", response.result)
    },
    submitForm(formName) {
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          apiUpdateUserInfo({
            id: this.$store.state.user.id,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone
          }).then(response => {
            that.$message({
              message: response.result,
              type: 'success',
              duration: 2000,
              center: true
            })
            store.commit("setUserPhone",that.ruleForm.phone)
            store.commit("setUserEmail",that.ruleForm.email)
          })
          // alert('submit!');
        } else {
          console.log('error submit!!');
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
.el-card {
  margin-top: 10px;
  width: 1000px;
  height: auto;
}

#UserName {
  margin-left: 10px;
}
</style>
