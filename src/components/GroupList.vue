<template>
  <el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分组</span>
      </div>
    </el-card>
  </el-row>
</template>

<script>
export default {
  name: "GroupList",
  data() {
    return {}
  }
}
</script>

<style scoped>
.el-row{
  margin-bottom: 20px;
}
.box-card {
  position: relative;
  width: 875px;
  top: 1px;
  left: 125px;
}
</style>
