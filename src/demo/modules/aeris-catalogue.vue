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
      message="Bienvenue sur le catalogue Aeris"
      criteria-header-icon-color="grey"
      criteria-background-color="#F5F5F5"
      criteria-content-primary-color="grey"
      summary-bar-width="400px"
      summary-max-length="200"
      cart-token="aeris"
      cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart"
      
    >
      <div slot="criteria">
        <aeris-keyword-search-criteria
          ref="keywordSearchCriteria"
          :language="language"
          @startSearch="catalogueSearchStart"
        ></aeris-keyword-search-criteria>
        <aeris-temporal-search-criteria ref="temporalSearch" :language="language"></aeris-temporal-search-criteria>
        <aeris-spatial-search-criteria
          ref="spatialExtentsSearch"
          :theme="theme"
          :language="language"
        ></aeris-spatial-search-criteria>
        <aeris-project-search-criteria
          ref="projectSearchCriteria"
          :theme="theme"
          :language="language"
        ></aeris-project-search-criteria>
        <aeris-parameter-search-criteria
          ref="parameterSearchCriteria"
          :theme="theme"
          :language="language"
        ></aeris-parameter-search-criteria>
        <aeris-platform-search-criteria
          ref="platformSearchCriteria"
          :theme="theme"
          :language="language"
        ></aeris-platform-search-criteria>
        <aeris-instrument-search-criteria
          ref="instrumentSearchCriteria"
          :theme="theme"
          :language="language"
        ></aeris-instrument-search-criteria>
        <aeris-site-search-criteria
          ref="siteSearchCriteria"
          :theme="theme"
          :language="language"
        ></aeris-site-search-criteria>
        <aeris-level-search-criteria
        ref="levelSearchCriteria"
          :theme="theme"
          :language="language"
        ></aeris-level-search-criteria>
         <aeris-collection-search-criteria
        ref="collectionSearchCriteria"
          :theme="theme"
          :language="language"
          program="ACTRIS-FR"
        ></aeris-collection-search-criteria>
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
  AerisCatalogHelpContent,
  AerisKeywordSearchCriteria,
  AerisTemporalSearchCriteria,
  AerisSpatialSearchCriteria,
  AerisSiteSearchCriteria,
  AerisLevelSearchCriteria,
  AerisCollectionSearchCriteria
} from "../../../src/lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-catalogue",

  components: {
    AerisKeywordSearchCriteria,
    AerisCatalog,
    AerisProjectSearchCriteria,
    AerisParameterSearchCriteria,
    AerisPlatformSearchCriteria,
    AerisInstrumentSearchCriteria,
    AerisCatalogueResetTextButton,
    AerisCatalogueSearchTextButton,
    AerisCatalogHelpContent,
    AerisTemporalSearchCriteria,
    AerisSpatialSearchCriteria,
    AerisSiteSearchCriteria,
    AerisLevelSearchCriteria,
    AerisCollectionSearchCriteria
  },

  data() {
    return {
      theme: { primaryColor: "rgb(243, 156, 18)", secondaryColor: "#FFF", emphasis: "#f39c12", color: "#FFF" },
      language: "fr"
    };
  },

  computed: {
    getSelectedThesaurusCriteria() {
      return this.$store.getters.getSelectedCriteria;
    },
    getSelectedCheckBoxCriteria() {
      return this.$store.getters.getSelectedCheckBoxCriteria;
    }
  },

  methods: {
    catalogueReset() {
      this.$refs.aeriscatalog.resetSearch();
      this.$refs.projectSearchCriteria.resetSelection();
      this.$refs.parameterSearchCriteria.resetSelection();
      this.$refs.platformSearchCriteria.resetSelection();
      this.$refs.instrumentSearchCriteria.resetSelection();
      this.$refs.temporalSearch.resetDate();
      this.$refs.spatialExtentsSearch.resetCoordinate();
      this.$refs.keywordSearchCriteria.resetEmptyValue();
      this.$refs.siteSearchCriteria.sitesReset();
      this.$refs.levelSearchCriteria.resetLevels();
      this.$refs.collectionSearchCriteria.resetCollection();
      this.$store.commit("clearSelectedCriteria");
      this.$store.commit("resetCoordinate");
      this.$store.commit("resetKeywords");
    },

    catalogueSearchStart() {
      let keywords = this.$store.getters.getKeywords;
      let temporal = this.$store.getters.getDate;
      let criteria = {
        keywords: keywords,
        searchOperator: "",
        temporal: temporal,
        userLanguage: this.language
      };

      let box = this.$store.getters.getCoordinate;
      if (box.north && box.south && box.east && box.west) {
        criteria = { ...criteria, box };
      }
      criteria = { ...criteria, ...this.getSelectedThesaurusCriteria, ...this.getSelectedCheckBoxCriteria };
      this.$refs.aeriscatalog.startSearch(criteria);
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

[data-template="metadata-block"] i,
.data-aeris-metadata-list li h5 {
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
