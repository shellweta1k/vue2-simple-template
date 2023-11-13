import Router from 'vue-router';
import layout from '@/layout/index.vue';
const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/index',
    meta: {
      menuName: '首页',
      icon: 'system',
      menuId: 'index',
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/index'),
        meta: {
          parentId: 'index',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index'),
    meta: {
      title: '登录',
    },
  },
];

// push
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

// replace
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

const router = new Router({
  mode: 'history',
  routes,
});
export default router;
export { routes };
