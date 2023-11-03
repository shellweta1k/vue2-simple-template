import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.scss';
import store from '@/store/index';
import '@/components/pageTool/index';
import '@/assets/icon/index';
import plugins from './plugins';
Vue.use(plugins);
Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.use(VueRouter).use(ElementUI);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
