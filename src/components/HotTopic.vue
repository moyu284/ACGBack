<template>
  <el-card style="width: 375px">
    <div slot="header">
      <span>最热话题</span>
    </div>
    <div>
      <ul class="infinite-list">
        <li>
          <div class="topic">
            <el-link>
              <router-link to="/details">福冈27日将举办《夏目友人帐》原画展</router-link>
            </el-link>
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
