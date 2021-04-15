<template>
  <div id="li-div">
    <div id="userHead">
      <img src="../../static/pic/1.jpg" height="48px" width="48px"/>
    </div>
    <div id="topic">
      <div>
        <el-link target="_blank">福冈27日将举办《夏目友人帐》原画展</el-link>
      </div>
      <div id="topicInfo">
        <span style="float: left">
          <el-button type="text">天下漫闻</el-button>
        </span>
        <span style="float: right">
          <el-button type="text" style="color: #303133">admin</el-button>
          <el-button type="text" style="color: #303133">
            10<i class="el-icon-view el-icon--right"></i>
          </el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Topic"
}
</script>

<style scoped>
.el-link {
  font-size: 16px;
}

#li-div {
  display: flex;
  padding: 10px;
  border-style: none none dashed none;
  border-width: 1px;
}

#userHead {
  margin-right: 10px;
  padding: 10px;
}

#topic {
  padding-top: 7px;
}

#topicInfo {
  width: 725px;
  overflow: hidden;
}

img {
  border-radius: 10px;
}
</style>
