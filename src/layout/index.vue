<template>
  <div class="layout-container">
    <el-container>
      <asideComponent />
      <main class="main-container">
        <headerComponent />
        <mainComponent />
      </main>
    </el-container>
  </div>
</template>

<script>
  import asideComponent from './aside/index.vue';
  import mainComponent from './main/index.vue';
  import headerComponent from './header/index.vue';
  export default {
    components: {
      asideComponent,
      mainComponent,
      headerComponent,
    },
  };
</script>

<style lang="scss" scoped>
  .layout-container {
    height: 100%;
    width: 100%;
    .el-container {
      height: 100%;
      width: 100%;
    }
  }
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
    }
  }
</style>
