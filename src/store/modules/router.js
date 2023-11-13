import { dataToRoute } from '@/router/routerTransform';
import { routes } from '@/router/router';
const state = {
  routes: [],
};

const mutations = {
  SET_ROUTERS(state, list) {
    state.routes = [...routes, ...list];
  },
};

const actions = {
  getRouters({ commit }) {
    return new Promise((resolve, reject) => {
      const routers = require('@/assets/route.json');
      const list = dataToRoute(routers.data);
      commit('SET_ROUTERS', list || []);
      resolve(list || []);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
