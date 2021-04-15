<template>
  <el-container>
    <el-main>
      <GroupList></GroupList>
      <LatestList></LatestList>
    </el-main>
    <el-aside width="500px">
      <HotTopic></HotTopic>
    </el-aside>
  </el-container>
</template>

<script>
import LatestList from '../components/LatestList'
import GroupList from '../components/GroupList'
import HotTopic from "./HotTopic";

export default {
  name: 'Main',
  components: {GroupList, LatestList, HotTopic},
  data() {
    return {
      items: []
    }
  },
  methods: {
    getData: function () {
      var that = this;
      axios.get()
        .then((response) => {

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
