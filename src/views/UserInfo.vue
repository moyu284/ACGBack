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
            <el-form label-width="auto">
              <el-form-item label="邮箱">
                <el-input type="text"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input type="text"></el-input>
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
import {apiUploadHeader} from "../request/api";
import store from "../store";
export default {
  name: "UserInfo",
  methods:{
    uploadImage:function (response, file, fileList){
      const that = this
      console.log(response)
      apiUploadHeader({
        id: that.$store.state.user.id,
        headerimg: response.result
      }).then(function (response){
        store.commit("setUser",response.result)
      })
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
