<template>
  <el-menu
    mode="vertical"
    background-color="RGB(48, 65, 86)"
    text-color="RGB(191, 203, 217)"
    :unique-opened=true
    router>
    <el-menu-item index="/">
        <i class="el-icon-house"></i>
        <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/carousel">
        <i class="el-icon-picture"></i>
        <span>轮播图</span>
    </el-menu-item>
    <el-menu-item index="/partition">
        <i class="el-icon-menu"></i>
        <span>分区管理</span>
    </el-menu-item>
    <el-submenu index="/plate">
      <template slot="title">
        <i class="el-icon-s-grid"></i>
        <span slot="title">版块管理</span>
      </template>
      <el-menu-item index="/plate/plate">
        父版块管理
      </el-menu-item>
      <el-menu-item index="/plate/subPlate">
        子板块管理
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/topic">
      <i class="el-icon-edit"></i>
      <span slot="title">帖子管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-s-custom"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>
.el-menu{
  height: 100%;
  width: 200px;
}
</style>
