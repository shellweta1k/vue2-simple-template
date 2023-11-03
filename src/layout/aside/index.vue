<template>
  <el-aside class="aside-container" :class="setting.asideExpend && 'asdie-collapse'">
    <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrapper">
      <div class="logo-container"></div>
      <el-menu
        :default-active="matchRoute"
        class="menu-container"
        mode="vertical"
        @select="menuSelect"
        :router="true"
        :collapse="true">
        <el-menu-item
          class="menu-item"
          v-for="item in routerList"
          :key="item.name"
          :index="item.path"
          :route="item.path">
          <item :icon="item.meta.icon" :title="item.meta.menuName"></item>
        </el-menu-item>
        <div class="shade"></div>
      </el-menu>
    </el-scrollbar>
    <div class="secondary-menu" v-if="setting.asideExpend">
      <div class="logo-container"></div>
      <div class="menu-list">
        <span class="title">
          {{ activeRoute.meta.menuName }}
        </span>
        <ul class="list-container">
          <li
            class="secondary-menu-item"
            v-for="child in activeRoute.children"
            :key="child.name"
            :class="metachChildRoute(child) && 'isActive'">
            <router-link :to="{ name: child.name }">{{ child.meta.menuName }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </el-aside>
</template>

<script>
  import { mapState } from 'vuex';
  import asideItem from '@/layout/aside/asideItem';
  import item from '@/layout/aside/item';
  const unExpendRoutes = ['/index'];
  export default {
    components: {
      asideItem,
      item,
    },
    data() {
      return {
        activeIndex: 0,
        activeRoute: {},
      };
    },
    computed: {
      ...mapState({
        routerList: (state) => state.router.routes,
        setting: (state) => state.setting.layoutSetting,
      }),
      matchRoute() {
        const { path, meta } = this.$route;
        const visibleRoutes = this.routerList;
        const resule = visibleRoutes.find((item) => item.meta.menuId === meta.parentId);
        this.$nextTick(() => {
          this.moveShade(visibleRoutes, resule);
        });
        this.activeRoute = resule;
        if (unExpendRoutes.some((r) => r === path)) {
          this.$store.commit('setting/SET_ASIDE_EXPEND', false);
        } else {
          this.$store.commit('setting/SET_ASIDE_EXPEND', true);
        }
        return resule.path;
      },
      metachChildRoute() {
        return (item) => {
          const { path } = this.$route;
          return item.path === path;
        };
      },
    },
    mounted() {},
    methods: {
      menuSelect(route) {
        console.log(route);
      },
      moveShade(routes, activeRoute) {
        const activeIndex = routes.findIndex((item) => item.path === activeRoute.path);
        const shadeDom = document.querySelector('.shade');
        shadeDom.style.top = activeIndex * 56 + 'px';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .aside-container {
    display: flex;
    overflow: hidden;
    width: fit-content !important;
    transition: all 0.3s;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    &.asdie-collapse {
      width: 300px !important;
    }
  }
  .scrollbar {
    width: 86px;
    height: 100%;
    border-radius: 0 25px 25px 0;
    background: linear-gradient(180deg, #1bcc9c 0%, #42dda0 100%);
  }
  .logo-container {
    height: 78px;
  }
  .menu-container {
    width: 100%;
    border-right: none;
    // padding-top: 100px;
    background-color: transparent;
    position: relative;
    &.el-menu--collapse {
      .menu-item {
        &::v-deep .el-tooltip {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        // .svg-icon {
        //   position: absolute;
        //   top: 50%;
        //   left: 50%;
        //   transform: translate(-50%, -50%);
        // }
      }
    }
    .el-menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: transparent;
      }
      &.is-active {
        background-color: transparent;
        &:hover {
          background-color: transparent;
        }
        .svg-icon {
          position: relative;
          z-index: 10;
          color: #3ad99f;
        }
      }
      .svg-icon {
        height: 28px;
        width: 28px;
        position: relative;
        z-index: 10;
        color: #fff;
      }
      span {
        // display: none;
        line-height: normal;
        position: relative;
        z-index: 10;
      }
    }

    .shade {
      height: 56px;
      width: 77px;
      border-radius: 33px 0 0 33px;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 9px;
      z-index: 1;
      transition: top 0.5s;
      &::after {
        display: block;
        content: '';
        height: 24px;
        width: 30px;
        position: absolute;
        top: -24px;
        right: -1px;
        // background-color: red;
        border-radius: 0 0 22px 0;
        box-shadow: 7px 7px 3px 0 #fff;
      }
      &::before {
        display: block;
        content: '';
        height: 24px;
        width: 30px;
        position: absolute;
        bottom: -24px;
        right: -1px;
        // background-color: red;
        border-radius: 0 22px 0px 0;
        box-shadow: 7px -7px 3px 0 #fff;
      }
    }
  }
  .secondary-menu {
    flex: 1;
    .menu-list {
      margin-top: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-family: 'Source Han Sans CN Medium';
        font-weight: 500;
        font-size: 18px;
        text-align: center;
        color: #000;
      }
      .list-container {
        margin: 0;
        padding: 0;
        text-decoration: none;
        list-style: none;
        .secondary-menu-item {
          cursor: pointer;
          margin-top: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          a {
            text-decoration: none;
            font-family: 'Source Han Sans CN';
            font-weight: 400;
            font-size: 16px;
            text-align: center;
            color: #252525;
          }
          &.isActive {
            position: relative;
            a {
              color: #3ad99f;
            }
            &::after {
              content: '';
              display: block;
              height: 17px;
              width: 5px;
              border-radius: 3px 0 0 3px;
              background: linear-gradient(180deg, #42dda0 0%, #1dcd9d 100%);
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
  }
</style>
