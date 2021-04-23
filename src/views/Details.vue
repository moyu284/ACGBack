<template>
  <el-container>
    <el-main>
      <el-card class="card" id="header" :body-style="{padding:'1px 1px 1px 20px'}">
        <h4>{{ thread.subject }}</h4>
      </el-card>
      <el-card class="card">
        <DetailsHeader :time="thread.addtime" :user="user"></DetailsHeader>
        <el-divider></el-divider>
        <div v-html="thread.content">
        </div>
      </el-card>
      <el-card class="card">
        <div>快速回复</div>
        <el-divider></el-divider>
        <div>
          <el-form>
            <el-form-item>
              <Tinymce></Tinymce>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')" disabled>提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="card">
        <div>评论</div>
        <el-divider></el-divider>
        <div>
          <Comment :comment-list="commentList"></Comment>
        </div>
      </el-card>
    </el-main>
    <el-aside width="500px">
      <HotTopic :hot-topic="hotTopic"></HotTopic>
    </el-aside>
  </el-container>
</template>

<script>


import DetailsHeader from "../components/DetailsHeader";
import HotTopic from "../components/HotTopic";
import Tinymce from "../components/Tinymce";
import Comment from "../components/Comment";
import {apiComment, apiGetThreads, apiGetThreadsHotTopic} from "../request/api";

export default {
  name: "Details",
  components: {HotTopic, DetailsHeader, Tinymce, Comment},
  data() {
    return {
      id: '',
      thread: {},
      user: {},
      time: '',
      hotTopic: [],
      commentList: []
    }
  },
  mounted() {
    this.getData()
    // this.getThreadsHotTopic()
  },
  watch: {
    "$route": "getData"
  },
  methods: {
    getData: function () {
      const that = this
      this.id = this.$route.query.id
      apiGetThreads({id: this.id})
        .then(function (response) {
          console.log(response)
          that.thread = response.result.threads
          that.user = response.user
        }).then(function () {
        apiGetThreadsHotTopic({id: that.thread.fid})
          .then(function (response) {
            console.log(response)
            that.hotTopic = response.result;
            console.log(that.hotTopic)
          })
        apiComment({pid: that.thread.pid})
          .then(function (response) {
            console.log(response)
            that.commentList = response.result
          })
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

.el-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}

.el-card {
  margin-bottom: 5px;
}

#header {

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
