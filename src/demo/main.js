import Vue from "vue";

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import VueRouter from "vue-router";
Vue.use(VueRouter);

import { VueColorPlugin, VueAerisLanguagePlugin } from "aeris-mixins";
Vue.use(VueColorPlugin);
Vue.use(VueAerisLanguagePlugin);

import app from "./components/app.vue";
import eurochamp from "./components/eurochamp.vue";
import gmos from "./components/gmos.vue";
import actris from "./components/actris.vue";
import iagos from "./components/iagos.vue";
import aeris from "./components/aeris.vue";
import aerisCatalogueMapTest from "./components/aeris-catalogue-map-test.vue"
import aerisSpatialSearchCriteriaTest from "./components/aeris-spatial-search-criteria-test.vue"

const router = new VueRouter({
  mode: "history",
  routes: [
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
      path: "/catalogue_map",
      component:aerisCatalogueMapTest
    },
    {
      path: "/spatial_search_criteria.vue",
      component:aerisSpatialSearchCriteriaTest
    }
  ]
});

new Vue({
  el: "#app",
  router,
  template: "<app/>",
  components: {
    app
  }
}).$mount("#app");
