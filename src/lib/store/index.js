import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex);

import commonModule from './modules/common-module.js'

const store = new Vuex.Store({
  modules: {
    common: commonModule
  }
});

export default store;
