<template>
  <center>
    <el-card>
      <div style="width: 750px">
        <el-form label-width="80px" label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="主题" prop="subject">
            <el-input v-model="ruleForm.subject"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-cascader
              v-model="selectedOptions"
              :options="options"
              :props="props"
              ref="checked"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <Tinymce ref="Tinymce"></Tinymce>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </center>
</template>

<script>
import Tinymce from "../components/Tinymce";
import {apiGetForums, apiSubmitThreads} from "../request/api";
import {Message} from "element-ui";
import router from "../router";

export default {
  name: "Publish",
  components: {Tinymce},
  data() {
    return {
      ruleForm: {
        subject: ''
      },
      rules: {
        subject: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      options: JSON.parse(sessionStorage.getItem("formsList")) || [],
      selectedOptions: [],
      props: {
        checkStrictly: false,
        value: 'code',
        label: 'name',
        children: 'children'
      },
      topic: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList: () => {
      const that = this
      apiGetForums()
        .then(response => {
          localStorage.setItem("formsList",JSON.stringify(getTreeData(response.result)))
        })
    },
    submitForm(formName) {
      const that = this
      const redirect = this.$route.query.redirect
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiSubmitThreads({
            fid: that.$refs['checked'].value[that.$refs['checked'].value.length-1],
            subject: this.ruleForm.subject,
            content: this.$refs.Tinymce.tinymceHtml,
            author: this.$store.state.user.username,
            authorid: this.$store.state.user.id
          }).then(response => {
            if (response.success){
              Message({
                message: response.result,
                type: 'success',
                duration: 2000
              })
              router.replace(redirect)
            }
          })
          console.log(that.$refs['checked'].value)
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

function getTreeData(data) {
  // 循环遍历json数据
  for(let i=0;i<data.length;i++){

    if(data[i].children.length<1){
      // children若为空数组，则将children设为undefined
      data[i].children=undefined;
    }else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children);
    }
  }
  return data;
}
</script>

<style scoped>
.el-card {
  margin-top: 10px;
  width: 1000px;
  height: auto;
}

.el-cascader {
  width: 100%;
}
</style>
