import Vue from "vue";

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import VueRouter from "vue-router";
Vue.use(VueRouter);

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

import Vuex from "vuex";
Vue.use(Vuex);

import { VueColorPlugin, VueAerisLanguagePlugin } from "aeris-mixins";
Vue.use(VueColorPlugin);
Vue.use(VueAerisLanguagePlugin);

import app from "./app.vue";
import AerisThesaurusItemCheckboxLayoutTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-thesaurus-item-checkbox-layout-test";
import AerisThesaurusItemTreeCheckboxLayoutTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-thesaurus-item-tree-checkbox-layout-test";
import AerisCatalogueSearchBoxTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-catalogue-search-box-test";
import AerisInstrumentSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-instrument-search-criteria-test";
import AerisParameterSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-parameter-search-criteria-test";

import eurochamp from "./modules/eurochamp.vue";
import gmos from "./modules/gmos.vue";
import actris from "./modules/actris.vue";
import iagos from "./modules/iagos.vue";
import aeris from "./modules/aeris.vue";

import searchCriteriaModule from "../../src/lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/store/aeris-search-criteria-store";

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    searchCriteriaModule
  }
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/thesaurus-item-checkbox-layout",
      component: AerisThesaurusItemCheckboxLayoutTest
    },
    {
      path: "/thesaurus-item-tree-checkbox-layout",
      component: AerisThesaurusItemTreeCheckboxLayoutTest
    },
    {
      path: "/instrument-search-criteria",
      component: AerisInstrumentSearchCriteriaTest
    },
    {
      path: "/parameter-search-criteria",
      component: AerisParameterSearchCriteriaTest
    },
    {
      path: "/eurochamp",
      component: eurochamp
    },
    {
      path: "/gmos",
      component: gmos
    },
    {
      path: "/actris",
      component: actris
    },
    {
      path: "/iagos",
      component: iagos
    },
    {
      path: "/aeris",
      component: aeris
    },
    {
      path: "/search_box",
      component: AerisCatalogueSearchBoxTest
    }
  ]
});

new Vue({
  el: "#app",
  store,
  router,
  template: "<app/>",
  components: {
    app
  }
}).$mount("#app");
