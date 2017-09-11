require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueColor from './vue-color.js'
Vue.use(VueColor)

import MdTemplateProxy from './aeris-catalog/md-template/md-template-proxy.vue'
import MdTemplateCollection from './aeris-catalog/md-template/md-template-collection.vue'
import MdTemplateCollection2 from './aeris-catalog/md-template/md-template-collection2.vue'
import AerisInternationalField from './misc/aeris-international-field.vue'
import AerisCatalogSearchBox from './aeris-catalog-box/aeris-catalog-search-box.vue'
import AerisCatalogMetadataPanel from './aeris-catalog/aeris-catalog-metadata-panel.vue'
import AerisKeywordSearchCriteria from './aeris-keyword-search-criteria/aeris-keyword-search-criteria.vue'
import AerisSpatialSearchCriteria from './aeris-spatial-search-criteria/aeris-spatial-search-criteria.vue'
import AerisTemporalSearchCriteria from './aeris-temporal-search-criteria/aeris-temporal-search-criteria.vue'
import AerisKeywordSearchCriteriaContent from './aeris-keyword-search-criteria/aeris-keyword-search-criteria-content.vue'
import AerisSpatialSearchCriteriaContent from './aeris-spatial-search-criteria/aeris-spatial-search-criteria-content.vue'
import AerisTemporalSearchCriteriaContent from './aeris-temporal-search-criteria/aeris-temporal-search-criteria-content.vue'
import CollectionSummary from './aeris-catalog-bar/summary/collection-summary.vue'
import AerisCatalogDefaultSummary from './aeris-catalog-bar/summary/aeris-catalog-default-summary.vue'
import AerisCatalogProxySummary from './aeris-catalog-bar/summary/aeris-catalog-proxy-summary.vue'
import AerisCatalogBar from './aeris-catalog-bar/aeris-catalog-bar.vue'
import AerisCatalogSummariesBar from './aeris-catalog-bar/aeris-catalog-summaries-bar.vue'
import AerisCatalogMap from './aeris-catalog-map/aeris-catalog-map.vue'
import AerisCatalog from './aeris-catalog/aeris-catalog.vue'
import AerisCatalogSearchButton from './aeris-catalog/button/aeris-catalogue-search-button.vue'
import AerisCatalogResetButton from './aeris-catalog/button/aeris-catalogue-reset-button.vue'
import AerisCatalogEditButton from './aeris-catalog/button/aeris-catalogue-edit-button.vue'
import AerisCatalogHelpButton from './aeris-catalog/button/aeris-catalogue-help-button.vue'
import AerisCatalogCart from './aeris-catalog-cart/aeris-catalog-cart.vue'
import AerisCatalogHelp from './aeris-catalog-help/aeris-catalog-help-content.vue'
import AerisPlatformSearchCriteriaContent from './aeris-platform-search-criteria/aeris-platform-search-criteria-content.vue'
import AerisPlatformSearchCriteria from './aeris-platform-search-criteria/aeris-platform-search-criteria.vue'

ljs.addAliases({
	dep: ['https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/css/perfect-scrollbar.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/js/perfect-scrollbar.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol.css',  
		'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.css',
		'https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol-debug.js',
		'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', 
		'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js', 
		'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/moment-range/3.0.3/moment-range.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-bash.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.js']
})

ljs.load('dep', function() {

	window.ol = ol
	
	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	
	var timer;
	
	function stopTimer() {
	    clearInterval(timer);
	}

	function register() {
		console.info("trying to register catalog components")
		if ((window.registredAerisElements.indexOf("aeris-commons-components-vjs") > -1) && (window.registredAerisElements.indexOf("aeris-metadata-components-vjs") > -1)) {
			console.info("Début registration des custom elements catalog")
			console.info("Registred elements at this time: "+window.registredAerisElements)
			
			Vue.customElement('md-template-proxy', MdTemplateProxy);
			window.registredAerisElements.push('md-template-proxy')
			
			Vue.customElement('md-template-collection2', MdTemplateCollection2);
			window.registredAerisElements.push('md-template-collection2')
			
			Vue.customElement('md-template-collection', MdTemplateCollection);
			window.registredAerisElements.push('md-template-collection')
			
			Vue.customElement('aeris-international-field', AerisInternationalField);
			window.registredAerisElements.push('aeris-international-field')

			Vue.customElement('aeris-catalogue-metadata-panel', AerisCatalogMetadataPanel);
			window.registredAerisElements.push('aeris-catalogue-metadata-panel')
			
			Vue.customElement('aeris-catalogue-search-button', AerisCatalogSearchButton);
			window.registredAerisElements.push('aeris-catalogue-search-button')
			
			Vue.customElement('aeris-catalogue-edit-button', AerisCatalogEditButton);
			window.registredAerisElements.push('aeris-catalogue-edit-button')
			
			Vue.customElement('aeris-catalogue-reset-button', AerisCatalogResetButton);
			window.registredAerisElements.push('aeris-catalogue-reset-button')
			
			Vue.customElement('aeris-catalogue-help-button', AerisCatalogHelpButton);
			window.registredAerisElements.push('aeris-catalogue-help-button')
			
			Vue.customElement('aeris-keyword-search-criteria-content', AerisKeywordSearchCriteriaContent);
			window.registredAerisElements.push('aeris-keyword-search-criteria-content')
			
			Vue.customElement('aeris-spatial-search-criteria-content', AerisSpatialSearchCriteriaContent);
			window.registredAerisElements.push('aeris-spatial-search-criteria-content')
			
			Vue.customElement('aeris-temporal-search-criteria-content', AerisTemporalSearchCriteriaContent);
			window.registredAerisElements.push('aeris-temporal-search-criteria-content')
			
			Vue.customElement('aeris-catalog-search-box', AerisCatalogSearchBox);
			window.registredAerisElements.push('aeris-catalog-search-box')
			
			Vue.customElement('aeris-keyword-search-criteria', AerisKeywordSearchCriteria);
			window.registredAerisElements.push('aeris-keyword-search-criteria')
			
			Vue.customElement('aeris-spatial-search-criteria', AerisSpatialSearchCriteria);
			window.registredAerisElements.push('aeris-spatial-search-criteria')
			
			Vue.customElement('aeris-temporal-search-criteria', AerisTemporalSearchCriteria);
			window.registredAerisElements.push('aeris-temporal-search-criteria')
			
		    Vue.customElement('aeris-catalog-default-summary', AerisCatalogDefaultSummary);
			window.registredAerisElements.push('aeris-catalog-default-summary')
			
			Vue.customElement('aeris-catalog-proxy-summary', AerisCatalogProxySummary);
			window.registredAerisElements.push('aeris-catalog-proxy-summary')
			
			Vue.customElement('aeris-catalog-summaries-bar', AerisCatalogSummariesBar);
			window.registredAerisElements.push('aeris-catalog-summaries-bar')
			
			Vue.customElement('aeris-catalog-bar', AerisCatalogBar);
			window.registredAerisElements.push('aeris-catalog-bar')

			Vue.customElement('aeris-catalog-map', AerisCatalogMap);
			window.registredAerisElements.push('aeris-catalog-map')
			
			Vue.customElement('aeris-catalog-cart', AerisCatalogCart);
			window.registredAerisElements.push('aeris-catalog-cart')
			
			Vue.customElement('aeris-catalog-help-content', AerisCatalogHelp);
			window.registredAerisElements.push('aeris-catalog-help-content')
						
			Vue.customElement('aeris-platform-search-criteria-content', AerisPlatformSearchCriteriaContent);
			window.registredAerisElements.push('aeris-platform-search-criteria-content')	
						
			Vue.customElement('aeris-platform-search-criteria', AerisPlatformSearchCriteria);
			window.registredAerisElements.push('aeris-platform-search-criteria')	
			
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
	
	timer = setInterval(function(){register()}, 1000);
})


