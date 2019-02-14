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
import aerisCatalogueMaximizeButtonTest from "./components/aeris-catalogue-maximize-button-test.vue"

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
      path:"/maximize_button",
      component: aerisCatalogueMaximizeButtonTest
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
