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

import app from "./app.vue";
import AerisThesaurusItemCheckboxLayoutTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-thesaurus-item-checkbox-layout-test";
import AerisThesaurusItemTreeCheckboxLayoutTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-thesaurus-item-tree-checkbox-layout-test";
import AerisSpatialSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria-test.vue";
import AerisCatalogueSearchBoxTest from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-catalogue-search-box-test.vue";
import AerisCatalogueSearchButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-search-button/aeris-catalogue-search-button-test.vue";
import AerisCatalogueResetTextButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-reset-text-button/aeris-catalogue-reset-text-button-test.vue";
import aerisInternationalFieldTest from "./modules/aeris-international-field/aeris-international-field-test";
import AerisCatalogueDrawMapButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-draw-map-button/aeris-catalogue-draw-map-button-test.vue";
import AerisCatalogueHelpButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-help-button/aeris-catalogue-help-button-test.vue";
import aerisCatalogueMaximizeButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-maximize-button/aeris-catalogue-maximize-button-test.vue";
import AerisCatalogueResetButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-reset-button/aeris-catalogue-reset-button-test.vue";
import AerisCatalogueSearchTextButtontest from "../demo/modules/aeris-catalog-buttons/aeris-catalogue-search-text-button/aeris-catalogue-search-text-button-test.vue";
import AerisCatalogueSelectMapButtonTest from "./modules/aeris-catalog-buttons/aeris-catalogue-select-map-button/aeris-catalogue-select-map-button-test.vue";
import AerisInstrumentSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-instrument-search-criteria-test";
import AerisParameterSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-parameter-search-criteria-test";
import AerisPlatformSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria-test";
import AerisProjectSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-project-search-criteria-test";
import AerisCatalogDefaultSummaryTest from "./modules/aeris-catalog-summaries/aeris-catalog-default-summary-test";
import AerisCatalogSummariesTest from "./modules/aeris-catalog-summaries/aeris-catalog-summaries-test";
import AerisTemporalSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria-test";
import AerisCatalogCartTest from "./modules/aeris-catalog-cart/aeris-catalog-cart-test";
import AerisCatalogueMapTest from "./modules/aeris-catalogue-map/aeris-catalogue-map-test";
import AerisMetadataPanelTest from "./modules/aeris-metadata-panel/metadata-panel-test.vue";
import AerisCatalogHelpContent from "./modules/aeris-catalog-help/aeris-catalog-help-content-test";
import AerisKeywordSearchCriteriaTest from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria-test.vue";

import eurochamp from "./modules/eurochamp.vue";
import gmos from "./modules/gmos.vue";
import actris from "./modules/actris.vue";
import iagos from "./modules/iagos.vue";
import aeris from "./modules/aeris.vue";

import searchCriteriaModule from "../../src/lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/store/aeris-search-criteria-store";
import notificationModule from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/store/aeris-notification-store";
import temporalModule from "../../src/lib/modules/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/store/aeris-temporal-search-criteria";
import cartStoreModule from "../../src/lib/modules/aeris-catalog-cart/store/aeris-catalog-cart-store";
import catalogSummariesModule from "../../src/lib/modules/aeris-catalog-summaries/store/aeris-catalog-summaries-store";
import catalogKeywordModule from "../../src/lib/modules/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/store/aeris-keyword-search-criteria";
import spatialcriteria from "../../src/lib/modules/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/store/aeris-spatial-criteria-store";

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    searchCriteriaModule,
    catalogSummariesModule,
    notificationModule,
    temporalModule,
    cartStoreModule,
    catalogKeywordModule,
    spatialcriteria
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
      path: "/metadata_panel",
      component: AerisMetadataPanelTest
    },
    {
      path: "/search_text_button",
      component: AerisCatalogueSearchTextButtontest
    },
    {
      path: "/reset_button",
      component: AerisCatalogueResetButtonTest
    },
    {
      path: "/maximize_button",
      component: aerisCatalogueMaximizeButtonTest
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
    },
    {
      path: "/select_map_button",
      component: AerisCatalogueSelectMapButtonTest
    },
    {
      path: "/search_text_button",
      component: AerisCatalogueSearchTextButtontest
    },
    {
      path: "/help_content",
      component: AerisCatalogHelpContent
    },
    {
      path: "/temporal_search_criteria",
      component: AerisTemporalSearchCriteriaTest
    },
    {
      path: "/catalog-cart",
      component: AerisCatalogCartTest
    },
    {
      path: "/catalogue_map",
      component: AerisCatalogueMapTest
    },
    {
      path: "/help_content",
      component: AerisCatalogHelpContent
    },
    {
      path: "/keyword",
      component: AerisKeywordSearchCriteriaTest
    },
    {
      path: "/spatial_criteria",
      component: AerisSpatialSearchCriteriaTest
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
