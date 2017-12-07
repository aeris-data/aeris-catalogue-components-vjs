import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import {
  VueColorPlugin,
  VueAerisLanguagePlugin
} from 'aeris-mixins'
Vue.use(VueColorPlugin)
Vue.use(VueAerisLanguagePlugin)

import AerisCatalogueComponents from '../lib/aeris-catalogue-components.js'
// Vue.use(AerisCatalogueComponents);

import VueCustomElementRecorder from '../lib/vue-custom-element-recorder.js'
VueCustomElementRecorder.run();

import app from './components/app.vue'
import eurochamp from './components/eurochamp.vue'
import gmos from './components/gmos.vue'
import actris from './components/actris.vue'
import aeris from './components/aeris.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/eurochamp',
      component: eurochamp
    },
    {
      path: '/gmos',
      component: gmos
    },
    {
      path: '/actris',
      component: actris
    },
    {
      path: '/aeris',
      component: aeris
    }
  ]
})

new Vue({
  el: "#app",
  router,
  template: '<app/>',
  components: {
    app
  }
}).$mount('#app')
