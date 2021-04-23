<template>
  <div style="display: flex">
    <div>
      <el-avatar size="large" src="../../static/pic/head.jpg"></el-avatar>
    </div>
    <div id="userInfo">
      <span>{{ username }}</span>
      <span>{{ time | formatDate}}</span>
    </div>
  </div>
</template>

<script>
import {formatDate} from "../public/FormatDate";
import axios from "axios";

export default {
  name: "DetailsHeader",
  props:{
    time:{},
    user:{
      type: Object,
      default: () => {}
    }
  },
  computed:{
    username(){
      return this.user ? this.user.username  :  'null'
    }
  },
  mounted() {
    console.log(this.user)
  },
  methods:{

  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  }
}
</script>

<style scoped>
#userInfo {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>
