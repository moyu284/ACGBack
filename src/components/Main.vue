<template>
  <el-container>
    <el-main>
      <LatestList :topic-list="topicList"></LatestList>
    </el-main>
    <el-aside width="500px">
      <HotTopic :hot-topic="hotTopic"></HotTopic>
    </el-aside>
  </el-container>
</template>

<script>
import LatestList from '../components/LatestList'
import GroupList from '../components/GroupList'
import HotTopic from "./HotTopic";
import {apiGetHotTopic, apiGetLatestList} from "../request/api";

export default {
  name: 'Main',
  components: {GroupList, LatestList, HotTopic},
  data() {
    return {
      topicList: [],
      hotTopic: []
    }
  },
  created() {
    this.getLatestList()
    this.getHotPic()
  },
  methods: {
    getLatestList() {
      const that = this
      apiGetLatestList().then(function (response){
        that.topicList = response.result
      })
    },
    getHotPic() {
      const that = this
      apiGetHotTopic().then(function (response) {
        that.hotTopic = response.result
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  padding: 1px;
}
</style>
