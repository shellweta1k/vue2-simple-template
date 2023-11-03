import Router from 'vue-router';
import layout from '@/layout/index';
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
];

const router = new Router({
  mode: 'history',
  routes,
});
export default router;
export { routes };
