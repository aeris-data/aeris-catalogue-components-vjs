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
	
	var timer;
	
	function registerElement(name, component) {
		if (!window.registredAerisElements) {
			window.registredAerisElements = [];
		}
		if (window.registredAerisElements.indexOf(name) < 0) {
			Vue.customElement(name, component);
			window.registredAerisElements.push(name)
		}
	}
	
	function stopTimer() {
	    clearInterval(timer);
	}

	function register() {
		console.info("trying to register catalog components")
		if ((window.registredAerisElements.indexOf("aeris-commons-components-vjs") > -1) && (window.registredAerisElements.indexOf("aeris-metadata-components-vjs") > -1)) {
			console.info("Début registration des custom elements catalog")
			console.info("Registred elements at this time: "+window.registredAerisElements)
			
			registerElement('md-template-collection', MdTemplateCollection);
			registerElement('md-template-proxy', MdTemplateProxy);
			registerElement('aeris-international-field', AerisInternationalField);
			registerElement('aeris-catalogue-metadata-panel', AerisCatalogMetadataPanel);
			registerElement('aeris-catalogue-search-button', AerisCatalogSearchButton);
			registerElement('aeris-catalogue-edit-button', AerisCatalogEditButton);
			registerElement('aeris-catalogue-reset-button', AerisCatalogResetButton);
			registerElement('aeris-catalogue-help-button', AerisCatalogHelpButton);
			registerElement('aeris-keyword-search-criteria-content', AerisKeywordSearchCriteriaContent);
			registerElement('aeris-spatial-search-criteria-content', AerisSpatialSearchCriteriaContent);
			registerElement('aeris-temporal-search-criteria-content', AerisTemporalSearchCriteriaContent);
			registerElement('aeris-catalog-search-box', AerisCatalogSearchBox);
			registerElement('aeris-keyword-search-criteria', AerisKeywordSearchCriteria);
			registerElement('aeris-spatial-search-criteria', AerisSpatialSearchCriteria);
			registerElement('aeris-temporal-search-criteria', AerisTemporalSearchCriteria);
			registerElement('aeris-catalog-default-summary', AerisCatalogDefaultSummary);
			registerElement('aeris-catalog-proxy-summary', AerisCatalogProxySummary);
			registerElement('aeris-catalog-summaries-bar', AerisCatalogSummariesBar);
			registerElement('aeris-catalog-bar', AerisCatalogBar);
			registerElement('aeris-catalog-map', AerisCatalogMap);
			registerElement('aeris-catalog-cart', AerisCatalogCart);
			registerElement('aeris-catalog-help-content', AerisCatalogHelp);
			registerElement('aeris-platform-search-criteria-content', AerisPlatformSearchCriteriaContent);
			registerElement('aeris-platform-search-criteria', AerisPlatformSearchCriteria);
			registerElement('aeris-catalog', AerisCatalog);
			
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


