<template>
  <h1>{{ hoursTip }}，{{ this.$store.state.user.username}}阁下欢迎回来</h1>
</template>

<script>
export default {
  name: "Welcome",
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
