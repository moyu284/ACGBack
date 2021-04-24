<template>
  <div id="app">
    <NavMenu></NavMenu>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'

export default {
  name: 'App',
  components: {NavMenu},
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-koharu/assets/',
        tagMode: false,
        debug: false,
        model: {jsonPath: '/static/live2dw/live2d-widget-model-koharu/assets/koharu.model.json'},
        display: {position: 'right', width: 150, height: 300},
        mobile: {show: true},
        log: false
      })
    }, 1000)
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>

</style>
