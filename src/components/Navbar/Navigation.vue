<template>
  <el-menu router mode="horizontal" menu-trigger="hover">
    <el-menu-item index="/">
      <img src="../../../static/pic/logo.png" style="height: 75px;width: 150px">
    </el-menu-item>
    <el-menu-item index="/">
      <template slot="title">
        首页
      </template>
    </el-menu-item>
    <navigation-item v-for="menu in menuList" :key="menu.path" :item="menu"/>
  </el-menu>
</template>

<script>
import NavigationItem from "./NavigationItem";

export default {
  name: "Navigation",
  components: {NavigationItem},
  props: {
    menuList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
