import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
import router from './modules/router';
import setting from './modules/setting';
const store = new Vuex.Store({
  modules: {
    router,
    setting,
  },
});

export default store;
