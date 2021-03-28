<template>
  <el-container>
    <el-main>
      <GroupList></GroupList>
      <LatestList></LatestList>
    </el-main>
    <el-aside width="500px">
    </el-aside>
  </el-container>
</template>

<script>
// import Waterfall from 'vue-waterfall'
// import WaterfallSlot from 'vue-waterfall'
import LatestList from '../components/LatestList'
import GroupList from '../components/GroupList'

export default {
  name: 'Main',
  components: {GroupList, LatestList},
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
