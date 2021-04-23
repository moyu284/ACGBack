<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>最新话题</span>
    </div>
    <ul style="overflow:auto">
      <li v-for="topic in topicList" :key="topic.id">
        <Topic :topic="topic"></Topic>
      </li>
    </ul>
  </el-card>
</template>

<script>
import Topic from "./Topic";

export default {
  name: "LatestList",
  components: {Topic},
  props:{
    topicList:{
      type:Array,
      required:true
    }
  },
  created() {
  },
  data() {
    return {
    }
  },
  methods: {

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
