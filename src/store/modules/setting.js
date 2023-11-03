const state = {
  layoutSetting: {
    asideExpend: true,
  },
};

const mutations = {
  SET_SETTING(state, setting) {
    state.layoutSetting = setting;
    window.localStorage.setItem('setting', JSON.stringify(setting));
  },
  SET_ASIDE_EXPEND(state, statu) {
    state.layoutSetting.asideExpend = statu;
    window.localStorage.setItem('setting', JSON.stringify(state.layoutSetting));
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
