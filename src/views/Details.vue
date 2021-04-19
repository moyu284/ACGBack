<template>
  <el-container>
    <el-main>
      <el-card class="card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>动漫</el-breadcrumb-item>
          <el-breadcrumb-item>动漫1</el-breadcrumb-item>
          <el-breadcrumb-item>帖子标题</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <el-card class="card">
        <DetailsHeader></DetailsHeader>
        <el-divider></el-divider>
        <div>
          <span>asdasdasdasdasd</span>
        </div>
      </el-card>
      <el-card class="card">
        <div>快速回复</div>
        <el-divider></el-divider>
        <div>
          <Tinymce></Tinymce>
        </div>
      </el-card>
      <el-card class="card">
        <div>评论</div>
        <el-divider></el-divider>
        <div>

        </div>
      </el-card>
    </el-main>
    <el-aside width="500px">
      <HotTopic></HotTopic>
    </el-aside>
  </el-container>
</template>

<script>


import DetailsHeader from "../components/DetailsHeader";
import HotTopic from "../components/HotTopic";
import Tinymce from "../components/Tinymce";

export default {
  name: "Details",
  components: {HotTopic, DetailsHeader, Tinymce}
}
</script>

<style scoped>
.el-main {
  padding: 1px;
}

.el-aside {
  margin-left: 10px;
}

.el-container {
  position: relative;
  left: 6%;
  margin: 10px;
  width: 1400px;
}

.el-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}

.el-card {
  margin-bottom: 5px;
}

card {
  width: 850px;
}

li {
  list-style-type: none;
}

ul {
  padding: 0px;
}
</style>
