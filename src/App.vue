<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    beforeMount() {
      const setting = this.$cache.local.getJSON('setting');
      if (setting) {
        this.$store.commit('setting/SET_SETTING', setting);
      }
    },
  };
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
  }
</style>
