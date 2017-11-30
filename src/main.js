require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import {VueColorPlugin, VueAerisLanguagePlugin} from 'aeris-mixins'
Vue.use(VueColorPlugin)
Vue.use(VueAerisLanguagePlugin)


import AerisUiInput from './aeris-catalog-ui/aeris-catalog-ui-input.vue'
import AerisUiCheckbox from './aeris-catalog-ui/aeris-catalog-ui-checkbox.vue'
import AerisUiCheckboxList from './aeris-catalog-ui/aeris-catalog-ui-checkbox-list.vue'
import AerisUiIconButton from './aeris-catalog-ui/aeris-catalog-ui-icon-button.vue'
import AerisUiButton from './aeris-catalog-ui/aeris-catalog-ui-button.vue'
import AerisUiDropdown from './aeris-catalog-ui/aeris-catalog-ui-dropdown.vue'
import AerisUiSearch from './aeris-catalog-ui/aeris-catalog-ui-search.vue'

import AerisTreeCheckboxLayout from './aeris-catalog-layouts/aeris-search-criteria-layout/aeris-tree-checkbox-layout.vue'
import MdTemplateProxy from './aeris-catalog-layouts/aeris-metadata-template/md-template-proxy.vue'
import AerisUiConfirmation from './aeris-catalog-ui/aeris-catalog-ui-confirmation.vue'
import MdTemplateCollection from './aeris-catalog-layouts/aeris-metadata-template/md-template-collection.vue'
import AerisInternationalField from './misc/aeris-international-field.vue'
import AerisCatalogSearchBox from './aeris-catalog-layouts/aeris-search-criteria-layout/aeris-catalog-search-box.vue'
import AerisCatalogMetadataPanel from './aeris-catalog-metadata-panel/aeris-catalog-metadata-panel.vue'
import AerisKeywordSearchCriteria from './aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/aeris-keyword-search-criteria.vue'
import AerisSpatialSearchCriteria from './aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/aeris-spatial-search-criteria.vue'
import AerisTemporalSearchCriteria from './aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/aeris-temporal-search-criteria.vue'
import AerisKeywordSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/aeris-keyword-search-criteria-content.vue'
import AerisSpatialSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/aeris-spatial-search-criteria-content.vue'
import AerisTemporalSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/aeris-temporal-search-criteria-content.vue'
import AerisCatalogDefaultSummary from './aeris-catalog-summaries/aeris-catalog-summary/aeris-catalog-default-summary.vue'
import AerisCatalogProxySummary from './aeris-catalog-summaries/aeris-catalog-summary/aeris-catalog-proxy-summary.vue'
import AerisCatalogCriteria from './aeris-catalog-criteria/aeris-catalog-criteria.vue'
import AerisCatalogSummaries from './aeris-catalog-summaries/aeris-catalog-summaries.vue'
import AerisCatalogMap from './aeris-catalog-map/aeris-catalog-map.vue'
import AerisCatalog from './aeris-catalog/aeris-catalog.vue'
import AerisCatalogMaximizeButton from './aeris-catalog-buttons/aeris-catalogue-maximize-button.vue'
import AerisCatalogSearchButton from './aeris-catalog-buttons/aeris-catalogue-search-button.vue'
import AerisCatalogResetButton from './aeris-catalog-buttons/aeris-catalogue-reset-button.vue'
import AerisCatalogEditButton from './aeris-catalog-buttons/aeris-catalogue-edit-button.vue'
import AerisCatalogHelpButton from './aeris-catalog-buttons/aeris-catalogue-help-button.vue'
import AerisCatalogCart from './aeris-catalog-cart/aeris-catalog-cart.vue'
import AerisCatalogHelp from './aeris-catalog-help/aeris-catalog-help-content.vue'
import AerisPlatformSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria/aeris-platform-search-criteria-content.vue'
import AerisPlatformSearchCriteria from './aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria/aeris-platform-search-criteria.vue'
import AerisLevelSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-level-search-criteria/aeris-level-search-criteria-content.vue'
import AerisLevelSearchCriteria from './aeris-catalog-criteria/aeris-search-criteria/aeris-level-search-criteria/aeris-level-search-criteria.vue'
import AerisCampaignSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-campaign-search-criteria-content.vue'
import AerisCollectionSearchCriteriaContent from './aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-collection-search-criteria-content.vue'
import AerisCollectionSearchCriteria from './aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-collection-search-criteria.vue'

ljs.addAliases({
	dep: [

		'https://unpkg.com/vuelayers/lib/style.css',
		'https://unpkg.com/vuelayers',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/css/perfect-scrollbar.min.css',
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
	var bundleName = "aeris-catalogue-components-vjs"

		function registerElement(name, component) {
		if (!window.registredAerisElements) {
			window.registredAerisElements = [];
		}
		if (window.registredAerisElements.indexOf(name) < 0) {
			let registrable = true
			if (window.aerisexclusions) {
				var aux = window.aerisexclusions[bundleName]
				if (aux) {
					if (aux.indexOf(name)>= 0) {
						console.log("Aeris - Exclusion of "+name)
						registrable = false;
					}
				}
			}
			if (registrable) {
				console.log("Aeris - Registration of "+name)
				Vue.customElement(name, component);
				window.registredAerisElements.push(name)
			}
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

			registerElement('aeris-catalog-ui-dropdown', AerisUiDropdown);
			registerElement('aeris-catalog-ui-search', AerisUiSearch);
			registerElement('aeris-catalog-ui-checkbox', AerisUiCheckbox);
			registerElement('aeris-catalog-ui-input', AerisUiInput);
			registerElement('aeris-catalog-ui-checkbox-list', AerisUiCheckboxList);
			registerElement('aeris-catalog-ui-icon-button', AerisUiIconButton);
			registerElement('aeris-catalog-ui-button', AerisUiButton);

      registerElement('aeris-tree-checkbox-layout', AerisTreeCheckboxLayout);
			registerElement('aeris-catalog-ui-confirmation', AerisUiConfirmation);
			registerElement('md-template-collection', MdTemplateCollection);
			registerElement('md-template-proxy', MdTemplateProxy);
			registerElement('aeris-international-field', AerisInternationalField);
			registerElement('aeris-catalogue-metadata-panel', AerisCatalogMetadataPanel);
			registerElement('aeris-catalogue-search-button', AerisCatalogSearchButton);
			registerElement('aeris-catalogue-maximize-button', AerisCatalogMaximizeButton);
			registerElement('aeris-catalogue-edit-button', AerisCatalogEditButton);
			registerElement('aeris-catalogue-reset-button', AerisCatalogResetButton);
			registerElement('aeris-catalogue-help-button', AerisCatalogHelpButton);
			registerElement('aeris-keyword-search-criteria-content', AerisKeywordSearchCriteriaContent);
			registerElement('aeris-spatial-search-criteria-content', AerisSpatialSearchCriteriaContent);
			registerElement('aeris-temporal-search-criteria-content', AerisTemporalSearchCriteriaContent);
			registerElement('aeris-collection-search-criteria-content', AerisCollectionSearchCriteriaContent);
			registerElement('aeris-campaign-search-criteria-content', AerisCampaignSearchCriteriaContent);
			registerElement('aeris-catalog-search-box', AerisCatalogSearchBox);
			registerElement('aeris-keyword-search-criteria', AerisKeywordSearchCriteria);
			registerElement('aeris-collection-search-criteria', AerisCollectionSearchCriteria);
			registerElement('aeris-spatial-search-criteria', AerisSpatialSearchCriteria);
			registerElement('aeris-temporal-search-criteria', AerisTemporalSearchCriteria);
			registerElement('aeris-catalog-default-summary', AerisCatalogDefaultSummary);
			registerElement('aeris-catalog-proxy-summary', AerisCatalogProxySummary);
			registerElement('aeris-catalog-summaries', AerisCatalogSummaries);
			registerElement('aeris-catalog-criteria', AerisCatalogCriteria);
			registerElement('aeris-catalog-map', AerisCatalogMap);
			registerElement('aeris-catalog-cart', AerisCatalogCart);
			registerElement('aeris-catalog-help-content', AerisCatalogHelp);
			registerElement('aeris-platform-search-criteria-content', AerisPlatformSearchCriteriaContent);
			registerElement('aeris-platform-search-criteria', AerisPlatformSearchCriteria);
			registerElement('aeris-level-search-criteria-content', AerisLevelSearchCriteriaContent);
			registerElement('aeris-level-search-criteria', AerisLevelSearchCriteria);
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
