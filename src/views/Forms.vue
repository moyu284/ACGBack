<template>
  <el-container>
    <el-main>
      <el-card class="card">
        <div slot="header">
          <span><b>{{forumsName}}</b></span>
        </div>
        <ul>
          <li v-for="topic in topicList" :key="topic.id">
            <Topic :topic="topic"></Topic>
          </li>
        </ul>
        <center>
          <el-pagination
            layout="prev, pager, next"
            :total="topicList.length">
          </el-pagination>
        </center>
      </el-card>
    </el-main>
    <el-aside width="500px">
      <HotTopic :hot-topic="hotTopic"></HotTopic>
    </el-aside>
  </el-container>
</template>

<script>
import HotTopic from "../components/HotTopic";
import Topic from "../components/Topic";
import {apiGetFormsName, apiGetForumsTopic, apiGetThreadsHotTopic} from "../request/api";

export default {
  name: "Forms",
  components: {HotTopic, Topic},
  data() {
    return {
      hotTopic: [],
      topicList: [],
      forumsName: ''
    }
  },
  created() {
    this.getData()
  },
  watch: {
    "$route": "getData"
  },
  methods: {
    getData: function () {
      const that = this
      this.forums = this.$route.query.forums

      apiGetForumsTopic({id: this.forums})
        .then(function (response) {
          that.topicList = response.result
        })

      apiGetThreadsHotTopic({id: this.forums})
        .then(function (response) {
          that.hotTopic = response.result;
        })

      apiGetFormsName({id: this.forums})
        .then(function (response) {
          that.forumsName = response.result
        })
    }
  }
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
