<template>
  <el-container>
    <el-main>
      <el-card class="card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>动漫</el-breadcrumb-item>
          <el-breadcrumb-item>动漫1</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <el-card class="card">
        <div slot="header">
          <span>动漫1</span>
        </div>
        <ul>
          <li>
            <Topic></Topic>
          </li>
        </ul>
        <center>
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </center>
      </el-card>
    </el-main>
    <el-aside width="500px">
      <HotTopic></HotTopic>
    </el-aside>
  </el-container>
</template>

<script>
import HotTopic from "../components/HotTopic";
import Topic from "../components/Topic";

export default {
  name: "Forms",
  components: {HotTopic, Topic}
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
