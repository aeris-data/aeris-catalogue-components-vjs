import Vue from "vue";

import EurochampMetadataComponents from "eurochamp-components";

import AerisUiInput from "./components/aeris-catalog-ui/aeris-catalog-ui-input.vue";
import AerisUiCheckbox from "./components/aeris-catalog-ui/aeris-catalog-ui-checkbox.vue";
import AerisUiCheckboxList from "./components/aeris-catalog-ui/aeris-catalog-ui-checkbox-list.vue";
import AerisUiIconButton from "./components/aeris-catalog-ui/aeris-catalog-ui-icon-button.vue";
import AerisUiButton from "./components/aeris-catalog-ui/aeris-catalog-ui-button.vue";
import AerisUiDropdown from "./components/aeris-catalog-ui/aeris-catalog-ui-dropdown.vue";
import AerisUiSearch from "./components/aeris-catalog-ui/aeris-catalog-ui-search.vue";

import AerisTreeCheckboxLayout from "./components/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-tree-checkbox-layout.vue";
import MdTemplateProxy from "./components/aeris-catalog-layouts/aeris-metadata-template/md-template-proxy.vue";
import MdTemplateCollection from "./components/aeris-catalog-layouts/aeris-metadata-template/md-template-collection.vue";
import MdTemplateSingleFileDownload from "./components/aeris-catalog-layouts/aeris-metadata-template/md-template-single-file-download.vue";
import MdTemplateYearSelectDownload from "./components/aeris-catalog-layouts/aeris-metadata-template/md-template-year-select-download.vue";
import AerisInternationalField from "./components/misc/aeris-international-field.vue";
import AerisCatalogSearchBox from "./components/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-catalog-search-box.vue";
import AerisCatalogMetadataPanel from "./components/aeris-catalog-metadata-panel/aeris-catalog-metadata-panel.vue";
import AerisKeywordSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/aeris-keyword-search-criteria.vue";
import AerisSpatialSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/aeris-spatial-search-criteria.vue";
import AerisTemporalSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/aeris-temporal-search-criteria.vue";
import AerisKeywordSearchCriteriaContent from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-keyword-search-criteria/aeris-keyword-search-criteria-content.vue";
import AerisSpatialSearchCriteriaContent from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/aeris-spatial-search-criteria-content.vue";
import AerisTemporalSearchCriteriaContent from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-temporal-search-criteria/aeris-temporal-search-criteria-content.vue";
import AerisCatalogDefaultSummary from "./components/aeris-catalog-summaries/aeris-catalog-summary/aeris-catalog-default-summary.vue";
import AerisCatalogProxySummary from "./components/aeris-catalog-summaries/aeris-catalog-summary/aeris-catalog-proxy-summary.vue";
import AerisCatalogCriteria from "./components/aeris-catalog-criteria/aeris-catalog-criteria.vue";
import AerisCatalogSummaries from "./components/aeris-catalog-summaries/aeris-catalog-summaries.vue";
import AerisCatalogMap from "./components/aeris-catalog-map/aeris-catalog-map.vue";
import AerisCatalog from "./components/aeris-catalog/aeris-catalog.vue";
import AerisCatalogMaximizeButton from "./components/aeris-catalog-buttons/aeris-catalogue-maximize-button.vue";
import AerisCatalogSearchButton from "./components/aeris-catalog-buttons/aeris-catalogue-search-button.vue";
import AerisCatalogSearchTextButton from "./components/aeris-catalog-buttons/aeris-catalogue-search-text-button.vue";
import AerisCatalogResetButton from "./components/aeris-catalog-buttons/aeris-catalogue-reset-button.vue";
import AerisCatalogResetTextButton from "./components/aeris-catalog-buttons/aeris-catalogue-reset-text-button.vue";
import AerisCatalogEditButton from "./components/aeris-catalog-buttons/aeris-catalogue-edit-button.vue";
import AerisCatalogHelpButton from "./components/aeris-catalog-buttons/aeris-catalogue-help-button.vue";
import AerisCatalogCart from "./components/aeris-catalog-cart/aeris-catalog-cart.vue";
import AerisCatalogHelp from "./components/aeris-catalog-help/aeris-catalog-help-content.vue";
import AerisLevelSearchCriteriaContent from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-level-search-criteria/aeris-level-search-criteria-content.vue";
import AerisLevelSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-level-search-criteria/aeris-level-search-criteria.vue";
import AerisCampaignSearchCriteriaContent from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-campaign-search-criteria-content.vue";
import AerisCollectionSearchCriteriaContent from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-collection-search-criteria-content.vue";
import AerisCollectionSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-collection-search-criteria/aeris-collection-search-criteria.vue";
import AerisPlatformSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-platform-search-criteria/aeris-platform-search-criteria.vue";
import AerisInstrumentSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-instrument-search-criteria/aeris-instrument-search-criteria.vue";
import AerisParameterSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-parameter-search-criteria/aeris-parameter-search-criteria.vue";
import AerisProjectSearchCriteria from "./components/aeris-catalog-criteria/aeris-search-criteria/aeris-project-search-criteria/aeris-project-search-criteria.vue";
import AerisThesaurusItemTreeCheckboxLayout from "./components/aeris-catalog-layouts/aeris-search-criteria-layout/aeris-thesaurus-item-tree-checkbox-layout.vue";

const css = [
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/css/perfect-scrollbar.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol.css",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.css"
];
const js = [
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/js/perfect-scrollbar.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol-debug.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-bash.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.js"
];

css.forEach(file => {
  let link = document.createElement("link");
  link.setAttribute("type", "text/css");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", file);
  document.head.appendChild(link);
});

js.forEach(file => {
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file);
  document.head.appendChild(script);
});

const components = [
  AerisUiInput,
  AerisUiCheckbox,
  AerisUiCheckboxList,
  AerisUiIconButton,
  AerisUiButton,
  AerisUiDropdown,
  AerisUiSearch,
  AerisTreeCheckboxLayout,
  MdTemplateProxy,
  MdTemplateCollection,
  MdTemplateSingleFileDownload,
  MdTemplateYearSelectDownload,
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
  AerisCatalogSearchTextButton,
  AerisCatalogResetButton,
  AerisCatalogResetTextButton,
  AerisCatalogEditButton,
  AerisCatalogHelpButton,
  AerisCatalogCart,
  AerisCatalogHelp,
  AerisLevelSearchCriteriaContent,
  AerisLevelSearchCriteria,
  AerisCampaignSearchCriteriaContent,
  AerisCollectionSearchCriteriaContent,
  AerisCollectionSearchCriteria,
  AerisPlatformSearchCriteria,
  AerisInstrumentSearchCriteria,
  AerisParameterSearchCriteria,
  AerisProjectSearchCriteria,
  AerisThesaurusItemTreeCheckboxLayout
];

const VueCustomElementRecorder = {
  run() {
    if (!window.registredAerisElements) {
      window.registredAerisElements = [];
    }

    var timer;
    var bundleName = "aeris-catalogue-components-vjs";

    function stopTimer() {
      clearInterval(timer);
    }


    function registerComponents() {
      if (
        window.registredAerisElements.indexOf("aeris-commons-components-vjs") > -1 &&
        window.registredAerisElements.indexOf("aeris-metadata-components-vjs") > -1
      ) {
        Vue.use(EurochampMetadataComponents);
        console.info("trying to register aeris catalogue components");
        console.info("Début registration des aeris catalogue components");
        console.info("Registred elements at this time: " + window.registredAerisElements);

        for (let component in components) {
          if (components[component]) {
            if (window.registredAerisElements.indexOf(components[component].name) < 0) {
              let registrable = true;
              if (window.aerisexclusions) {
                let aux = window.aerisexclusions[bundleName];
                if (aux) {
                  if (aux.indexOf(components[component].name) >= 0) {
                    console.log("Aeris - Exclusion of " + components[component].name);
                    registrable = false;
                  }
                }
              }
              if (registrable) {
                console.log("Aeris - Registration of " + components[component].name);
                Vue.customElement(components[component].name, components[component]);
                window.registredAerisElements.push(components[component].name);
              }
            }
          }
        }

        window.registredAerisElements.push("aeris-catalogue-components-vjs");
        stopTimer();
        console.info("aeris catalogue components registration complete");
      }
    }

    timer = setInterval(function() {
      registerComponents();
    }, 1000);
  }
};

export default VueCustomElementRecorder;
