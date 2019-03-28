import Vue from "vue";

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import VueRouter from "vue-router";
Vue.use(VueRouter);
import VueLayers from "vuelayers";
Vue.use(VueLayers);
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

import Vuex from "vuex";
Vue.use(Vuex);

import { VueColorPlugin, VueAerisLanguagePlugin } from "aeris-mixins";
Vue.use(VueColorPlugin);
Vue.use(VueAerisLanguagePlugin);

import AerisCatalogue from "../demo/modules/aeris.vue";

import searchCriteriaModule from "../../src/lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/store/aeris-search-criteria-store";
import notificationModule from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/store/aeris-notification-store";
import cartStoreModule from "../../src/lib/modules/aeris-catalog-cart/store/aeris-catalog-cart-store";
import catalogSummariesModule from "../../src/lib/modules/aeris-catalog-summaries/store/aeris-catalog-summaries-store";

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    searchCriteriaModule,
    catalogSummariesModule,
    notificationModule,
    cartStoreModule
  }
});

new Vue({
  el: "#app",
  store,
  template: "<app/>",
  components: {
    AerisCatalogue
  }
}).$mount("#app");
