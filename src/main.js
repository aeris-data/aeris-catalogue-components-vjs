require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);


import AerisCatalogSearchBox from './aeris-catalog-box/aeris-catalog-search-box.vue'
import AerisKeywordSearchCriteria from './aeris-keyword-search-criteria/aeris-keyword-search-criteria.vue'
import AerisKeywordSearchCriteriaContent from './aeris-keyword-search-criteria/aeris-keyword-search-criteria-content.vue'

ljs.addAliases({
	dep: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js']
})
ljs.load('dep', function() {
	Vue.customElement('aeris-catalog-search-box', AerisCatalogSearchBox);
	Vue.customElement('aeris-keyword-search-criteria', AerisKeywordSearchCriteria);
	Vue.customElement('aeris-keyword-search-criteria-content', AerisKeywordSearchCriteriaContent);
})


