<template>
  <div>
    <aeris-catalog
      ref="aeriscatalog"
      :style="{
        '--criteriaBackgroundColor': '#F5F5F5',
        '--criteriaContentPrimaryColor': 'grey',
        '--criteriaHeaderIconColor': 'grey'
      }"
      :theme="theme"
      :language="language"
      metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/"
      message="Test message : vous êtes sur le catalogue aeris"
      criteria-header-icon-color="grey"
      criteria-background-color="#F5F5F5"
      criteria-content-primary-color="grey"
      summary-bar-width="400px"
      summary-max-length="200"
      cart-token="aeris"
      cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart"
    >
      <div slot="criteria">
        <aeris-project-search-criteria :theme="theme" :language="language"></aeris-project-search-criteria>
        <aeris-parameter-search-criteria :theme="theme" :language="language"></aeris-parameter-search-criteria>
        <aeris-platform-search-criteria :theme="theme" :language="language"></aeris-platform-search-criteria>
        <aeris-instrument-search-criteria :theme="theme" :language="language"></aeris-instrument-search-criteria>
      </div>
      <div slot="buttons-criteria">
        <aeris-catalogue-reset-text-button
          :theme="theme"
          :language="language"
          @catalogueReset="catalogueReset"
        ></aeris-catalogue-reset-text-button>
        <aeris-catalogue-search-text-button
          :theme="theme"
          :language="language"
          @catalogueSearchStart="catalogueSearchStart"
        ></aeris-catalogue-search-text-button>
      </div>
    </aeris-catalog>
    <aeris-catalog-help-content
      :theme="theme"
      :language="language"
      helpcookie="aeris-help-popup"
    ></aeris-catalog-help-content>
  </div>
</template>

<script>
import {
  AerisCatalog,
  AerisProjectSearchCriteria,
  AerisParameterSearchCriteria,
  AerisPlatformSearchCriteria,
  AerisInstrumentSearchCriteria,
  AerisCatalogueResetTextButton,
  AerisCatalogueSearchTextButton,
  AerisCatalogHelpContent
} from "../../../src/lib/modules/aeris-catalogue-components";
export default {
  name: "aeris",

  components: {
    AerisCatalog,
    AerisProjectSearchCriteria,
    AerisParameterSearchCriteria,
    AerisPlatformSearchCriteria,
    AerisInstrumentSearchCriteria,
    AerisCatalogueResetTextButton,
    AerisCatalogueSearchTextButton,
    AerisCatalogHelpContent
  },

  data() {
    return {
      theme: { primaryColor: "rgb(243, 156, 18)", secondaryColor: "#FFF", emphasis: "#f39c12", color: "#FFF" },
      language: "fr"
    };
  },

  methods: {
    catalogueReset() {
      this.$refs.aeriscatalog.resetSearch();
    },
    catalogueSearchStart() {
      this.$refs.aeriscatalog.startSearch();
    }
  }
};
</script>

<style>
[aeris-ui-icon-button] > * {
  color: grey;
}

[aeris-catalog] [data-criteria] > * {
  background: #f5f5f5;
}

[data-aeris-catalog-criteria] h3 {
  font-size: 1rem;
  font-weight: 400;
}

[data-criteria="buttons"] > div {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

[data-criteria="buttons"] > div > button > i {
  color: #fff;
}
[data-criteria="buttons"] > div > button:nth-child(2) {
  margin-left: 5px;
}

[data-template="metadata-block"] h5 {
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  --primaryColor: rgb(11, 107, 179);
}

[data-template="metadata-block"] h6 {
  margin-bottom: 2px;
  min-width: 30%;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 15px;
  --primaryColor: rgb(11, 107, 179);
}

[data-template="metadata-block"] {
  margin-bottom: 10px !important;
  break-inside: avoid;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

[data-template="metadata-block"] i {
  --primary: rgb(11, 107, 179);
}

[data-template="metadata-block"] article {
  margin-left: 10px;
  margin-bottom: 10px;
}

[data-template="metadata-block"] header {
  padding: unset;
}
.data-aeris-catalog-metadata-panel .data-aeris-metadata-panel-project-list div {
  background: rgb(11, 107, 179) !important;
}
.data-aeris-catalog-metadata-panel aside button {
  background: #e2e2e2 !important;
}
</style>
