<template>
  <div>
    <el-row type="flex" justify="start" align="middle"
            style="hebox-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-col :span="16" :offset="2">
        <el-menu mode="horizontal" menu-trigger="hover">
          <el-menu-item index="1" route="App">
            <img src="../../static/pic/logo.png" style="height: 75px;width: 150px">
          </el-menu-item>
          <el-menu-item index="1" route="App">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">动漫</template>
            <el-menu-item index="2-1">动漫1</el-menu-item>
            <el-menu-item index="2-2">动漫1</el-menu-item>
            <el-menu-item index="2-3">动漫1</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">游戏</template>
            <el-menu-item index="3-1">游戏1</el-menu-item>
            <el-menu-item index="3-2">游戏1</el-menu-item>
            <el-menu-item index="3-3">游戏1</el-menu-item>
          </el-submenu>
          <el-menu-item index="4">首页</el-menu-item>
          <el-menu-item index="5">首页</el-menu-item>
          <el-menu-item index="6">登录</el-menu-item>
          <el-menu-item index="7" style="float: right;">
            <el-input
              type="text"
              suffix-icon="el-icon-search"
              placeholder="搜索">
            </el-input>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <el-menu mode="horizontal" menu-trigger="hover">
          <el-menu-item index="1" style="float: right;">登录</el-menu-item>
          <el-menu-item index="2" style="float: right;">注册</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="1">
        <el-button style="background-color: #FF4B8B;">
          发布
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>

<style scoped>
</style>
