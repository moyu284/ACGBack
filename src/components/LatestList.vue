<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>最新话题</span>
    </div>
    <ul class="infinite-list" style="overflow:auto" v-infinite-scroll="load">
      <li v-for="i in count" class="infinite-list-item">
        <Topic></Topic>
      </li>
    </ul>
  </el-card>
</template>

<script>
import Topic from "./Topic";

export default {
  name: "LatestList",
  components: {Topic},
  data() {
    return {
      count: 0
    }
  },
  methods: {
    load() {
      this.count = 2
    }
  }

}
</script>

<style scoped>
ul {
  padding: 0px;
}

li {
  list-style-type: none;
}

.box-card {
  position: relative;
  width: 875px;
  left: 125px;
}
</style>
