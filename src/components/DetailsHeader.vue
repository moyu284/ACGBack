<template>
  <div style="display: flex">
    <div>
      <el-avatar size="large" src="../../static/pic/head.jpg"></el-avatar>
    </div>
    <div id="userInfo">
      <span>admin</span>
      <span>2021-04-17 12:23:32</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsHeader"
}
</script>

<style scoped>
#userInfo {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>
