import AerisUiInput from './components/aeris-catalog-ui/aeris-catalog-ui-input.vue'
import AerisUiCheckbox from './components/aeris-catalog-ui/aeris-catalog-ui-checkbox.vue'
import AerisUiCheckboxList from './components/aeris-catalog-ui/aeris-catalog-ui-checkbox-list.vue'
import AerisUiIconButton from './components/aeris-catalog-ui/aeris-catalog-ui-icon-button.vue'
import AerisUiButton from './components/aeris-catalog-ui/aeris-catalog-ui-button.vue'
import AerisUiDropdown from './components/aeris-catalog-ui/aeris-catalog-ui-dropdown.vue'
import AerisUiSearch from './components/aeris-catalog-ui/aeris-catalog-ui-search.vue'

import AerisTreeCheckboxLayout from './components/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-tree-checkbox-layout.vue'
import MdTemplateProxy from './components/aeris-catalog-layouts/aeris-metadata-template/md-template-proxy.vue'
import AerisUiConfirmation from './components/aeris-catalog-ui/aeris-catalog-ui-confirmation.vue'
import MdTemplateCollection from './components/aeris-catalog-layouts/aeris-metadata-template/md-template-collection.vue'
import AerisInternationalField from './components/misc/aeris-international-field.vue'
import AerisCatalogSearchBox from './components/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-catalog-search-box.vue'
import AerisCatalogMetadataPanel from './components/aeris-catalog-metadata-panel/aeris-catalog-metadata-panel.vue'
import AerisKeywordSearchCriteria from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/aeris-keyword-search-criteria.vue'
import AerisSpatialSearchCriteria from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/aeris-spatial-search-criteria.vue'
import AerisTemporalSearchCriteria from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/aeris-temporal-search-criteria.vue'
import AerisKeywordSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/aeris-keyword-search-criteria-content.vue'
import AerisSpatialSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/aeris-spatial-search-criteria-content.vue'
import AerisTemporalSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/aeris-temporal-search-criteria-content.vue'
import AerisCatalogDefaultSummary from './components/aeris-catalog-summaries/aeris-catalog-summary/aeris-catalog-default-summary.vue'
import AerisCatalogProxySummary from './components/aeris-catalog-summaries/aeris-catalog-summary/aeris-catalog-proxy-summary.vue'
import AerisCatalogCriteria from './components/aeris-catalog-criteria/aeris-catalog-criteria.vue'
import AerisCatalogSummaries from './components/aeris-catalog-summaries/aeris-catalog-summaries.vue'
import AerisCatalogMap from './components/aeris-catalog-map/aeris-catalog-map.vue'
import AerisCatalog from './components/aeris-catalog/aeris-catalog.vue'
import AerisCatalogMaximizeButton from './components/aeris-catalog-buttons/aeris-catalogue-maximize-button.vue'
import AerisCatalogSearchButton from './components/aeris-catalog-buttons/aeris-catalogue-search-button.vue'
import AerisCatalogResetButton from './components/aeris-catalog-buttons/aeris-catalogue-reset-button.vue'
import AerisCatalogEditButton from './components/aeris-catalog-buttons/aeris-catalogue-edit-button.vue'
import AerisCatalogHelpButton from './components/aeris-catalog-buttons/aeris-catalogue-help-button.vue'
import AerisCatalogCart from './components/aeris-catalog-cart/aeris-catalog-cart.vue'
import AerisCatalogHelp from './components/aeris-catalog-help/aeris-catalog-help-content.vue'
import AerisPlatformSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria/aeris-platform-search-criteria-content.vue'
import AerisPlatformSearchCriteria from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria/aeris-platform-search-criteria.vue'
import AerisLevelSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-level-search-criteria/aeris-level-search-criteria-content.vue'
import AerisLevelSearchCriteria from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-level-search-criteria/aeris-level-search-criteria.vue'
import AerisCampaignSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-campaign-search-criteria-content.vue'
import AerisCollectionSearchCriteriaContent from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-collection-search-criteria-content.vue'
import AerisCollectionSearchCriteria from './components/aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-collection-search-criteria.vue'

const AerisCatalogueComponents = {
  AerisUiInput,
  AerisUiCheckbox,
  AerisUiCheckboxList,
  AerisUiIconButton,
  AerisUiButton,
  AerisUiDropdown,
  AerisUiSearch,
  AerisTreeCheckboxLayout,
  MdTemplateProxy,
  AerisUiConfirmation,
  MdTemplateCollection,
  AerisInternationalField,
  AerisCatalogSearchBox,
  AerisCatalogMetadataPanel,
  AerisKeywordSearchCriteria,
  AerisSpatialSearchCriteria,
  AerisTemporalSearchCriteria,
  AerisKeywordSearchCriteriaContent,
  AerisSpatialSearchCriteriaContent,
  AerisTemporalSearchCriteriaContent,
  AerisCatalogDefaultSummary,
  AerisCatalogProxySummary,
  AerisCatalogCriteria,
  AerisCatalogSummaries,
  AerisCatalogMap,
  AerisCatalog,
  AerisCatalogMaximizeButton,
  AerisCatalogSearchButton,
  AerisCatalogResetButton,
  AerisCatalogEditButton,
  AerisCatalogHelpButton,
  AerisCatalogCart,
  AerisCatalogHelp,
  AerisPlatformSearchCriteriaContent,
  AerisPlatformSearchCriteria,
  AerisLevelSearchCriteriaContent,
  AerisLevelSearchCriteria,
  AerisCampaignSearchCriteriaContent,
  AerisCollectionSearchCriteriaContent,
  AerisCollectionSearchCriteria
};

AerisCatalogueComponents.install = (Vue) => {
  for (let component in AerisCatalogueComponents) {
    if (AerisCatalogueComponents[component] && component !== 'install') {
      Vue.component(AerisCatalogueComponents[component].name, AerisCatalogueComponents[component]);
    }
  }
};

export default AerisCatalogueComponents;
