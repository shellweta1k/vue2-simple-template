import Vue from 'vue';
import router from './router';
import store from '@/store/index';
Vue.use(router);

router.beforeEach((to, from, next) => {
  if (store.state.router.routes.length === 0) {
    store.dispatch('router/getRouters').then((res) => {
      console.log(res);
      router.addRoute(...res);
      next({ path: to.path });
    });
  }
  next();
});

router.afterEach((to, from) => {});

export default router;
