<template>
  <div id="app">
    <NavMenu></NavMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'

export default {
  name: 'App',
  components: {NavMenu},
  data() {
    return {
      forums: []
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
        model: { jsonPath: '/static/live2dw/live2d-widget-model-koharu/assets/koharu.model.json' },
        display: { position: 'right', width: 150, height: 300 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  }
}
</script>

<style>

</style>
