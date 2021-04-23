<template>
  <ul  style="overflow:auto">
    <li v-for="(comment,index) in commentList" :key="index">
      <div id="li-div">
        <div>
          <DetailsHeader :time="comment.threads.addtime" :user="comment.user"></DetailsHeader>
        </div>
        <div v-html="comment.threads.content"/>
      </div>
    </li>
    <center>
      <el-pagination
        layout="prev, pager, next"
        :total="commentList.length">
      </el-pagination>
    </center>
    <li>
    </li>
  </ul>

</template>

<script>
import DetailsHeader from "./DetailsHeader";

export default {
  name: "Comment",
  components:{DetailsHeader},
  props:{
    commentList:{
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
#li-div {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-style: none none dashed none;
  border-width: 1px;
}
</style>
