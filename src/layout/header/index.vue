<template>
  <el-header class="header-container">
    <div class=""></div>
    <div class="user-info-block">
      <el-dropdown trigger="click">
        <div class="info-container">
          <img class="portrait" :src="logo" alt="" />
          <span class="name">User</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button style="width: 100px" type="text" @click="logout">登出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
  export default {
    data() {
      return {
        logo: require('@/assets/logo.png'),
      };
    },
    methods: {
      logout() {
        this.$cookies.removeItem('token');
        this.$router.push('/login');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dropdown-item {
      min-width: 120px;
    }
  }
  .user-info-block {
    height: 100%;
    display: flex;
    align-items: center;
    .info-container {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .portrait {
        border-radius: 50%;
        height: 45px;
        width: 45px;
      }
    }
  }
</style>
