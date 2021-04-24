<template>
  <el-card style="width: 375px">
    <div slot="header">
      <span>最热话题</span>
    </div>
    <div>
      <ul class="infinite-list">
        <li v-for=" topic in hotTopic" :key="hotTopic.id">
          <div class="topic">
            <el-link>
              <router-link :to="'/details?id='+topic.id">{{ topic.subject }}</router-link>
            </el-link>
            <el-divider></el-divider>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HotTopic",
  props:{
    hotTopic:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped>
li{
  list-style-type: none;
}
.topic{
  word-wrap:break-word;
  word-break:break-all;
}
</style>
