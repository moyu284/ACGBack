<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default {
  name: "Index",
  components: {Sidebar,Navbar},
  data() {
    return {
      hoursTip: '',
    }
  },
  created(){
    this.getMycount();
  },
  methods: {
    getMycount: function () {
      let self = this;

      let date = new Date();

      if (date.getHours() >= 0 && date.getHours() < 12) {
        self.hoursTip = "上午好"

      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.hoursTip = "下午好"

      } else {
        self.hoursTip = "晚上好"

      }

    }
  }
}
</script>

<style scoped>

</style>
