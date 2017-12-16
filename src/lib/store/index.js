import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex);

import commonModule from './modules/common-module.js'
import helpModule from './modules/help-module.js'
import catalogueModule from './modules/catalogue-module.js'
import metadataModule from './modules/metadata-module.js'

const store = new Vuex.Store({
  modules: {
    common: commonModule,
    help: helpModule,
    catalogue: catalogueModule,
    metadata: metadataModule
  }
});

export default store;
