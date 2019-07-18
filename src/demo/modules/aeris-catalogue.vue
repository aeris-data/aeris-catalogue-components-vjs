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
  AerisSiteSearchCriteria
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
    AerisSiteSearchCriteria
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
      this.$store.commit("clearSelectedCriteria");
      this.$store.commit("resetCoordinate");
      this.$store.commit("resetKeywords");
      this.$store.commit("resetSites");
    },

    catalogueSearchStart() {
      let sites = this.$store.getters.getSites;
      let keywords = this.$store.getters.getKeywords;
      let temporal = this.$store.getters.getDate;
      let criteria = {
        keywords: keywords,
        searchOperator: "",
        temporal: temporal,
        userLanguage: this.language,
        sites: sites
      };

      let box = this.$store.getters.getCoordinate;
      if (box.north && box.south && box.east && box.west) {
        criteria = { ...criteria, box };
      }

      criteria = { ...criteria, ...this.getSelectedThesaurusCriteria };
      this.$refs.aeriscatalog.startSearch(criteria);
    }
  }
};
</script>

<style>
[aeris-catalog] [data-criteria] > * {
  background: #f5f5f5;
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
</style>
