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
		components:{NavMenu}
	}
</script>

<style>

</style>
