<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>最新话题</span>
      </div>
      <ul class="infinite-list" style="overflow:auto" v-infinite-scroll="load">
        <li v-for="i in count" class="infinite-list-item">
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
                  <el-button type="text" style="color: #303133">10<i class="el-icon-view el-icon--right"></i> </el-button>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </el-card>
</template>

<script>
export default {
  name: "LatestList",
  data() {
    return {
      count: 0
    }
  },
  methods: {
    load() {
      this.count = 1
    }
  }
}
</script>

<style scoped>
#li-div{
  display: flex;
  padding: 10px;
  border-style: none none dashed none;
  border-width: 1px;
}
#userHead{
  margin-right: 10px;
  padding: 10px;
}
#topic{
  padding-top: 7px;
}
#topicInfo{
  width: 725px;
  overflow: hidden;
}
img{
  border-radius: 10px;
}
ul{
  padding: 0px;
}
li{
  list-style-type: none;
}
el-link{
  font-size: 16px;
}
.box-card {
  position: relative;
  width: 875px;
  left: 125px;
}
</style>
