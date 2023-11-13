import Vue from 'vue';
import router from './router';
import store from '@/store/index';
import docCookies from '@/utils/cookies';
import NProgress from 'nprogress';
NProgress.configure({ minimum: 1 });
Vue.use(router);
const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (docCookies.getItem('token') !== null) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.state.router.routes.length === 0) {
        try {
          const res = await store.dispatch('router/getRouters');
          router.addRoute(...res);
          next({ ...to, replace: true });
        } catch (e) {
          console.log('e', e);
          docCookies.removeItem('token');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        next();
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
