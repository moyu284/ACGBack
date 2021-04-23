<template v-if="item.children">
  <el-menu-item :index="item.path" v-if="item.children.length === 0">
    {{ item.name }}
  </el-menu-item>
  <el-submenu v-else :index="item.path">
    <template slot="title">
      {{ item.name }}
    </template>
    <template v-for="child in item.children">
      <navigation-item v-if="child.children&&child.children.length>0"
                       :item="child"
                       :key="child.path"/>
      <el-menu-item v-else :key="child.path" :index="child.path">
        {{ child.name }}
      </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
