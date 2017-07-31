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
import AerisCatalogBar from './aeris-catalog-bar/aeris-catalog-bar.vue'
import AerisCatalogMap from './aeris-catalog-map/aeris-catalog-map.vue'
import AerisCatalog from './aeris-catalog/aeris-catalog.vue'
import AerisCatalogSearchButton from './aeris-catalog/button/aeris-catalogue-search-button.vue'
import AerisCatalogResetButton from './aeris-catalog/button/aeris-catalogue-reset-button.vue'
import AerisCatalogEditButton from './aeris-catalog/button/aeris-catalogue-edit-button.vue'


ljs.addAliases({
	dep: ['https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol.css', 'https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol-debug.js','https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js']
})
ljs.load('dep', function() {
	window.ol = ol
	
	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	
	var timer;
	
	function stopTimer() {
	    clearTimeout(timer);
	}

	function register() {
		console.info("trying to register catalog components")
		if (window.registredAerisElements.indexOf("aeris-commons-components-vjs") > -1) {
			console.info("Début registration des custom elements catalog")
			console.info("Registred elements at this time: "+window.registredAerisElements)
			Vue.customElement('aeris-catalogue-search-button', AerisCatalogSearchButton);
			window.registredAerisElements.push('aeris-catalogue-search-button')
			Vue.customElement('aeris-catalogue-edit-button', AerisCatalogEditButton);
			window.registredAerisElements.push('aeris-catalogue-edit-button')
			Vue.customElement('aeris-catalogue-reset-button', AerisCatalogResetButton);
			window.registredAerisElements.push('aeris-catalogue-reset-button')
			Vue.customElement('aeris-keyword-search-criteria-content', AerisKeywordSearchCriteriaContent);
			window.registredAerisElements.push('aeris-keyword-search-criteria-content')
			Vue.customElement('aeris-catalog-search-box', AerisCatalogSearchBox);
			window.registredAerisElements.push('aeris-catalog-search-box')
			Vue.customElement('aeris-keyword-search-criteria', AerisKeywordSearchCriteria);
			window.registredAerisElements.push('aeris-keyword-search-criteria')
			Vue.customElement('aeris-catalog-bar', AerisCatalogBar);
			window.registredAerisElements.push('aeris-catalog-bar')
			Vue.customElement('aeris-catalog-map', AerisCatalogMap);
			window.registredAerisElements.push('aeris-catalog-map')
			Vue.customElement('aeris-catalog', AerisCatalog);
			window.registredAerisElements.push('aeris-catalog')
			window.registredAerisElements.push('aeris-catalogue-components-vjs')
			stopTimer()
			console.info("catalog components registration complete")
		}
		else {
			console.info("aeris-commons-components-vjs not available yet...")
		}
	}
	
	timer = setTimeout(function(){register()}, 1000);
	
	
})


