<template>
  <el-card style="width: 375px">
    <div slot="header">
      <span>最热话题</span>
    </div>
    <div>
      <ul class="infinite-list">
        <li>
          <div class="topic">
            <el-link>无下划线</el-link>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HotTopic"
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
