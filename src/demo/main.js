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

import AerisCatalogueSearchBoxTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-catalogue-search-box-test.vue";
import AerisCatalogueSearchButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-search-button/aeris-catalogue-search-button-test.vue";
import AerisCatalogueResetTextButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-reset-text-button/aeris-catalogue-reset-text-button-test.vue";
import aerisInternationalFieldTest from "./modules/aeris-international-field/aeris-international-field-test";
import AerisCatalogueDrawMapButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-draw-map-button/aeris-catalogue-draw-map-button-test.vue";
import AerisCatalogueHelpButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-help-button/aeris-catalogue-help-button-test.vue";

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
      path: "/help_button",
      component: AerisCatalogueHelpButtonTest
    },
    {
      path: "/draw_map_button",
      component: AerisCatalogueDrawMapButtonTest
    },
    {
      path: "/international_field",
      component: aerisInternationalFieldTest
    },
    {
      path: "/search_button",
      component: AerisCatalogueSearchButtonTest
    },
    {
      path: "/reset_text_button",
      component: AerisCatalogueResetTextButtonTest
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
