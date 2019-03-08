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
import AerisCatalogueSearchButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-search-button/aeris-catalogue-search-button-test.vue";
import AerisCatalogueResetTextButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-reset-text-button/aeris-catalogue-reset-text-button-test.vue";
import aerisInternationalFieldTest from "./modules/aeris-international-field/aeris-international-field-test";
import AerisInstrumentSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-instrument-search-criteria-test";
import AerisParameterSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-parameter-search-criteria-test";
import AerisPlatformSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria-test";
import AerisProjectSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-project-search-criteria-test";
import AerisCatalogDefaultSummaryTest from "./modules/aeris-catalog-summaries/aeris-catalog-default-summary-test";
import AerisCatalogSummariesTest from "./modules/aeris-catalog-summaries/aeris-catalog-summaries-test";

import eurochamp from "./modules/eurochamp.vue";
import gmos from "./modules/gmos.vue";
import actris from "./modules/actris.vue";
import iagos from "./modules/iagos.vue";
import aeris from "./modules/aeris.vue";

import searchCriteriaModule from "../../src/lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/store/aeris-search-criteria-store";
import catalogSummariesModule from "../../src/lib/modules/aeris-catalog-summaries/store/aeris-catalog-summaries-store";
import notificationModule from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/store/aeris-notification-store";

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    searchCriteriaModule,
    catalogSummariesModule,
    notificationModule
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
      path: "/platform-search-criteria",
      component: AerisPlatformSearchCriteriaTest
    },
    {
      path: "/project-search-criteria",
      component: AerisProjectSearchCriteriaTest
    },
    {
      path: "/default-summary",
      component: AerisCatalogDefaultSummaryTest
    },
    {
      path: "/summaries",
      component: AerisCatalogSummariesTest
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
