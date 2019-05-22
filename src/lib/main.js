import Vue from "vue";
import VueCustomElement from "vue-custom-element";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLayers from "vuelayers";

Vue.use(VueCustomElement);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueAxios, axios);
Vue.use(VueLayers);

import AerisCatalogue from "../demo/modules/aeris-catalogue.vue";

import searchCriteriaModule from "./modules/aeris-catalog-layouts/aeris-search-criteria-layout/store/aeris-search-criteria-store";
import notificationModule from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/store/aeris-notification-store";
import temporalModule from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/store/aeris-temporal-search-criteria";
import cartStoreModule from "./modules/aeris-catalog-cart/store/aeris-catalog-cart-store";
import catalogSummariesModule from "./modules/aeris-catalog-summaries/store/aeris-catalog-summaries-store";
import catalogKeywordModule from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/store/aeris-keyword-search-criteria";
import catalogSiteModule from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-site-search-criteria/store/aeris-site-search-criteria-store";
import spatialcriteria from "./modules/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/store/aeris-spatial-criteria-store";

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    catalogSiteModule,
    searchCriteriaModule,
    catalogSummariesModule,
    notificationModule,
    temporalModule,
    cartStoreModule,
    catalogKeywordModule,
    spatialcriteria
  }
});

AerisCatalogue.store = store;

Vue.customElement("aeris-catalogue", AerisCatalogue);
