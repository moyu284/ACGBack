<template>
  <center>
    <el-card>
      <div style="width: 750px">
        <el-form label-width="80px" label-position="right">
          <el-form-item label="主题">
            <el-input v-model="topic"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-cascader
              v-model="value"
              :options="options"
              @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="内容">
            <Tinymce></Tinymce>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </center>
</template>

<script>
import Tinymce from "../components/Tinymce";

export default {
  name: "Publish",
  components: {Tinymce},
  data() {
    return {
      topic:''
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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

.el-cascader {
  width: 100%;
}
</style>
